"use server";

import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// 写真アップロード
export async function uploadPhoto(formData: FormData, tripId: number) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const file = formData.get("photo") as File;
        const description = formData.get("description") as string;

        if (!file) {
            throw new Error("No file provided");
        }

        // ファイルサイズチェック（5MB制限）
        if (file.size > 5 * 1024 * 1024) {
            throw new Error("File size must be less than 5MB");
        }

        // ファイル形式チェック
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            throw new Error("Only JPEG, PNG, and WebP files are allowed");
        }

        // ユーザーがこの旅行プランにアクセス権限があるかチェック
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const trip = await prisma.trip.findFirst({
            where: {
                id: tripId,
                OR: [
                    { ownerId: user.id },
                    {
                        members: {
                            some: {
                                userId: user.id,
                            },
                        },
                    },
                ],
            },
        });

        if (!trip) {
            throw new Error("Trip not found or access denied");
        }

        // ユニークなファイル名を生成
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2);
        const extension = file.name.split(".").pop();
        const fileName = `trip_${tripId}_photo_${timestamp}_${randomId}.${extension}`;

        await prisma.photo.create({
            data: {
                tripId: tripId,
                userId: user.id,
                fileName: fileName,
                originalName: file.name,
                description: description || null,
            },
        });
        // Supabase Storageにアップロード
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("trip-photo")
            .upload(fileName, file);

        console.log("uploadData", uploadData);

        if (uploadError) {
            throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // データベースにメタデータを保存
        revalidatePath(`/trip/${tripId}`);
        return { success: true };
    } catch (error) {
        console.error("Upload photo error:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to upload photo",
        };
    }
}

// 写真削除
export async function deletePhoto(photoId: number) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const photo = await prisma.photo.findFirst({
            where: {
                id: photoId,
                trip: {
                    OR: [
                        { ownerId: user.id },
                        {
                            members: {
                                some: {
                                    userId: user.id,
                                },
                            },
                        },
                    ],
                },
            },
        });

        if (!photo) {
            throw new Error("Photo not found or access denied");
        }

        // データベースから削除
        await prisma.photo.delete({
            where: { id: photoId },
        });
        // Supabase Storageから削除
        const { error: deleteError } = await supabase.storage
            .from("trip-photo")
            .remove([photo.fileName]);

        if (deleteError) {
            console.error("Storage delete error:", deleteError);
        }

        revalidatePath(`/trip/${photo.tripId}`);
        return { success: true };
    } catch (error) {
        console.error("Delete photo error:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to delete photo",
        };
    }
}
