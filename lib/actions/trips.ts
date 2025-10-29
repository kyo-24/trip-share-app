"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "../supabase";
import { formatYmd } from "../utils";

// プラン作成
export async function createTrip(formData: FormData) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const title = formData.get("title");
        const destination = formData.get("destination");
        const budget = formData.get("budget");
        const description = formData.get("description");
        const startDate = formData.get("startDate");
        const endDate = formData.get("endDate");
        const coverImageEntry = formData.get("coverImage");
        const coverImage =
            coverImageEntry instanceof File && coverImageEntry.size > 0
                ? (coverImageEntry as File)
                : undefined;

        console.log(
            title,
            destination,
            budget,
            description,
            startDate,
            endDate,
            coverImage
        );

        // バリデーション
        if (!title || !destination || !startDate || !endDate) {
            throw new Error("Missing required fields");
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        // ユニークなファイル名を生成
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2);
        const extension = coverImage?.name.split(".").pop();
        const fileName = coverImage
            ? `cover_image_${timestamp}_${randomId}.${extension}`
            : null;

        await prisma.trip.create({
            data: {
                title: String(title),
                destination: String(destination),
                budget: budget ? Number(budget) : 0,
                description: description ? String(description) : null,
                startDate: new Date(String(startDate)),
                endDate: new Date(String(endDate)),
                originalFileName: coverImage ? coverImage.name : null,
                fileName: fileName,
                ownerId: user.id,
            },
        });
        if (coverImage && fileName) {
            const { data: uploadData, error: uploadError } =
                await supabase.storage
                    .from("trip-cover-image")
                    .upload(fileName, coverImage);

            console.log("uploadData", uploadData);

            if (uploadError) {
                throw new Error(`Upload failed: ${uploadError.message}`);
            }
        }
    } catch (error) {
        console.error("Create trip error:", error);
        throw new Error("Failed to create trip");
    }
    revalidatePath("/");
    redirect("/");
}

// プラン更新
export async function updateTrip(
    id: number,
    data: {
        title?: string;
        destination?: string;
        budget?: number;
        description?: string;
        startDate?: string;
        endDate?: string;
        coverImage?: File | undefined;
    }
) {
    console.log(data);
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        // プランのオーナーかチェック
        const trip = await prisma.trip.findUnique({
            where: { id },
            include: { owner: true },
        });

        if (!trip) {
            throw new Error("Trip not found");
        }

        if (trip.owner.clerkId !== userId) {
            throw new Error("Forbidden");
        }

        // coverImage が有効なときのみ扱う
        const coverImage =
            data.coverImage && data.coverImage.size > 0
                ? data.coverImage
                : undefined;

        console.log(coverImage);

        // ユニークなファイル名を生成（新しい画像がある場合のみ）
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2);
        const extension = coverImage?.name.split(".").pop();
        const fileName = coverImage
            ? `cover_image_${timestamp}_${randomId}.${extension}`
            : undefined;

        console.log(fileName);

        await prisma.trip.update({
            where: { id },
            data: {
                title: data.title,
                destination: data.destination,
                budget: data.budget,
                description: data.description,
                startDate: data.startDate
                    ? new Date(data.startDate)
                    : undefined,
                endDate: data.endDate ? new Date(data.endDate) : undefined,
                // coverImage がなければ既存を変更しない
                originalFileName: coverImage ? coverImage.name : "",
                fileName: fileName ?? "",
            },
        });

        if (coverImage && fileName) {
            if (trip.fileName) {
                await supabase.storage
                    .from("trip-cover-image")
                    .remove([trip.fileName]);
            }
            const { data: uploadData, error: uploadError } =
                await supabase.storage
                    .from("trip-cover-image")
                    .upload(fileName, coverImage, { upsert: true });
            console.log("uploadData", uploadData);

            if (uploadError) {
                throw new Error(`Upload failed: ${uploadError.message}`);
            }
        }
    } catch (error) {
        console.error("Update trip error:", error);
        return { success: false, error: "Failed to update trip" };
    }
    revalidatePath(`/trip/${id}`);
    redirect(`/trip/${id}`);
}

// プラン削除
export async function deleteTrip(id: number) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        // プランのオーナーかチェック
        const trip = await prisma.trip.findUnique({
            where: { id },
            include: { owner: true },
        });

        if (!trip) {
            throw new Error("Trip not found");
        }

        if (trip.owner.clerkId !== userId) {
            throw new Error("プランのオーナー以外は削除できません");
        }

        const photos = await prisma.photo.findMany({ where: { tripId: id } });

        // アルバム写真削除
        if (photos.length > 0) {
            await supabase.storage
                .from("trip-photo")
                .remove(photos.map((p) => p.fileName));
        }

        // カバー画像削除
        if (trip?.fileName) {
            await supabase.storage
                .from("trip-cover-image")
                .remove([trip.fileName]);
        }

        await prisma.trip.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Delete trip error:", error);
        return { success: false, error: "Failed to delete trip" };
    }
    revalidatePath("/");
    redirect("/");
}

// 旅行プラン検索処理
export async function searchTripsAction(q: string, limit = 8) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return [] as { id: number; title: string; createdAt: string }[];
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            select: { id: true },
        });

        if (!user) {
            return [] as { id: number; title: string; createdAt: string }[];
        }

        const trips = await prisma.trip.findMany({
            where: {
                title: { contains: q },
                OR: [
                    { ownerId: user.id },
                    { members: { some: { userId: user.id } } },
                ],
            },
            orderBy: { createdAt: "desc" },
            take: Math.min(Math.max(limit, 1), 20),
            select: { id: true, title: true, createdAt: true },
        });

        return trips.map((t) => ({
            id: t.id,
            title: t.title,
            createdAt: formatYmd(t.createdAt),
        }));
    } catch (error) {
        console.error("Search trips action error:", error);
        return [] as { id: number; title: string; createdAt: string }[];
    }
}
