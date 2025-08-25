import { prisma } from "@/lib/prisma";

// スケジュール一覧取得
export async function getSchedules({ tripId }: { tripId: number }) {
    try {
        const schedules = await prisma.schedule.findMany({
            where: { tripId },
            orderBy: {
                startTime: "asc",
            },
        });

        return schedules;
    } catch (error) {
        console.error("Get schedules error:", error);
        return null;
    }
}

// スケジュール詳細取得
export async function getScheduleDetail(id: number) {
    try {
        const schedule = await prisma.schedule.findUnique({
            where: { id },
        });

        return schedule;
    } catch (error) {
        console.error("Get schedule error:", error);
        return null;
    }
}
