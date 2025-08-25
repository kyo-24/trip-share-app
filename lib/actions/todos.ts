"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// TODO作成
export async function createTodo(formData: FormData, tripId: number) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const title = formData.get("title");
        const description = formData.get("description");

        // バリデーション
        if (!title) {
            throw new Error("Title is required");
        }

        await prisma.todo.create({
            data: {
                title: String(title),
                description: description ? String(description) : null,
                tripId: tripId,
            },
        });

        revalidatePath(`/trip/${tripId}`);
        return { success: true };
    } catch (error) {
        console.error("Create todo error:", error);
        return { success: false, error: "Failed to create todo" };
    }
}

// TODO更新
export async function updateTodo(
    todoId: number,
    data: {
        title?: string;
        description?: string;
        completed?: boolean;
    }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const todo = await prisma.todo.findFirst({
            where: {
                id: todoId,
            },
        });

        if (!todo) {
            throw new Error("Todo not found or access denied");
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: todoId },
            data,
        });

        revalidatePath(`/trip/${todo.tripId}`);
        return { success: true, todo: updatedTodo };
    } catch (error) {
        console.error("Update todo error:", error);
        return { success: false, error: "Failed to update todo" };
    }
}

// TODO削除
export async function deleteTodo(todoId: number) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const todo = await prisma.todo.findFirst({
            where: {
                id: todoId,
            },
        });

        if (!todo) {
            throw new Error("Todo not found or access denied");
        }

        await prisma.todo.delete({
            where: { id: todoId },
        });

        revalidatePath(`/trip/${todo.tripId}`);
        return { success: true };
    } catch (error) {
        console.error("Delete todo error:", error);
        return { success: false, error: "Failed to delete todo" };
    }
}

// TODO完了状態変更
export async function toggleTodoComplete(todoId: number) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const todo = await prisma.todo.findFirst({
            where: {
                id: todoId,
            },
        });

        if (!todo) {
            throw new Error("Todo not found or access denied");
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: todoId },
            data: {
                completed: !todo.completed,
            },
        });

        revalidatePath(`/trip/${todo.tripId}`);
        return { success: true, todo: updatedTodo };
    } catch (error) {
        console.error("Toggle todo complete error:", error);
        return { success: false, error: "Failed to toggle todo complete" };
    }
}
