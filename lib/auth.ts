import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getUserData() {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
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
            return { success: false, user: null };
        }

        return { success: true, user };
    } catch (error) {
        console.error("Get user error:", error);
        return { success: false, error: "Internal server error" };
    }
}
