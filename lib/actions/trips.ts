"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
        const coverImage = formData.get("coverImageUrl");
        const coverImageUrl =
            typeof coverImage === "string" ? coverImage : undefined;

        console.log(
            title,
            destination,
            budget,
            description,
            startDate,
            endDate,
            coverImageUrl
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

        await prisma.trip.create({
            data: {
                title: String(title),
                destination: String(destination),
                budget: budget ? Number(budget) : 0,
                description: description ? String(description) : null,
                startDate: new Date(String(startDate)),
                endDate: new Date(String(endDate)),
                coverImageUrl: coverImageUrl ?? null,
                ownerId: user.id,
            },
        });
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
        coverImageUrl?: string | undefined;
    }
) {
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

        await prisma.trip.update({
            where: { id },
            data: {
                ...data,
                startDate: data.startDate
                    ? new Date(data.startDate)
                    : undefined,
                endDate: data.endDate ? new Date(data.endDate) : undefined,
            },
        });
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
            createdAt: t.createdAt.toISOString(),
        }));
    } catch (error) {
        console.error("Search trips action error:", error);
        return [] as { id: number; title: string; createdAt: string }[];
    }
}
