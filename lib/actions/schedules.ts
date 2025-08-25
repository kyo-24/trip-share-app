"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// スケジュール作成
export async function createSchedule(formData: FormData, tripId: number) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const dateStr = formData.get("date") as string; // 例: "2025-08-19"
        const startStr = formData.get("startTime") as string; // 例: "12:00"
        const endStr = formData.get("endTime") as string;
        const title = formData.get("title");
        const description = formData.get("description");
        // バリデーション
        if (!dateStr || !startStr || !endStr || !title || !description) {
            throw new Error("Missing required fields");
        }

        await prisma.schedule.create({
            data: {
                date: new Date(dateStr),
                startTime: new Date(`${dateStr}T${startStr}`),
                endTime: new Date(`${dateStr}T${endStr}`),
                title: String(title),
                description: String(description),
                tripId: Number(tripId),
            },
        });
    } catch (error) {
        console.error("Create schedule error:", error);
        throw new Error("Failed to create schedule");
    }
    revalidatePath(`/trip/${tripId}`); // 旅行詳細ページを再検証
}

// スケジュール更新
export async function updateSchedule(
    id: number,
    data: {
        date?: string;
        title?: string;
        description?: string;
        startTime?: string;
        endTime?: string;
    }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const schedule = await prisma.schedule.findUnique({
            where: { id },
        });

        if (!schedule) {
            throw new Error("Schedule not found");
        }

        const updatedSchedule = await prisma.schedule.update({
            where: { id },
            data: {
                ...data,
                date: data.date ? new Date(data.date) : undefined,
                startTime: data.startTime
                    ? new Date(data.startTime)
                    : undefined,
                endTime: data.endTime ? new Date(data.endTime) : undefined,
            },
        });

        revalidatePath(`/trip/${schedule.tripId}`); // 旅行詳細ページを再検証
        return { success: true, schedule: updatedSchedule };
    } catch (error) {
        console.error("Update schedule error:", error);
        return { success: false, error: "Failed to update schedule" };
    }
}

// スケジュール削除
export async function deleteSchedule(id: number) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const schedule = await prisma.schedule.findUnique({
            where: { id },
        });

        if (!schedule) {
            throw new Error("Schedule not found");
        }

        await prisma.schedule.delete({
            where: { id },
        });

        revalidatePath(`/trip/${schedule.tripId}`); // 旅行詳細ページを再検証
        return { success: true };
    } catch (error) {
        console.error("Delete schedule error:", error);
        return { success: false, error: "Failed to delete schedule" };
    }
}
