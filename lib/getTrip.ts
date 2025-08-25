import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// プラン一覧取得
export async function getTrips() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: {
                ownedTrips: true,
                tripMembers: {
                    include: {
                        trip: true,
                    },
                },
            },
        });

        if (!user) {
            return null;
        }

        const allTrips = [
            ...user.ownedTrips,
            ...user.tripMembers.map((member) => member.trip),
        ];

        return allTrips;
    } catch (error) {
        console.error("Get trips error:", error);
        return null;
    }
}

// プラン詳細取得
export async function getTripDetail(id: number) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return null;
        }

        const trip = await prisma.trip.findUnique({
            where: { id },
            include: {
                owner: true,
                members: {
                    include: {
                        user: true,
                    },
                },
                schedules: true,
                todos: true,
            },
        });

        return trip;
    } catch (error) {
        console.error("Get trip error:", error);
        return null;
    }
}
