"use server";

import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function syncUser() {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const clerk = await clerkClient();
        const clerkUser = await clerk.users.getUser(userId);

        const fullName =
            [clerkUser.firstName, clerkUser.lastName]
                .filter(Boolean)
                .join(" ") || "";

        const user = await prisma.user.upsert({
            where: { clerkId: userId },
            update: {
                email: clerkUser.emailAddresses[0]?.emailAddress || "",
                name: fullName,
                updatedAt: new Date(),
            },
            create: {
                clerkId: userId,
                email: clerkUser.emailAddresses[0]?.emailAddress || "",
                name: fullName,
            },
        });

        return { success: true, user };
    } catch (error) {
        console.error("Auth sync error:", error);
        return { success: false, error: "Internal server error" };
    }
}
