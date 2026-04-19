"use server";

import { getDb } from "@/lib/db";
import { Product, type Supplier, type User } from "@/lib/types";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";

function generateCredentials(): { login: string; password: string } {
    const login = randomBytes(6).toString("hex");
    const password = randomBytes(4).toString("hex");
    return { login, password };
}

export async function getUsers(): Promise<User[]> {
    const db = getDb();
    const users = await db<User[]>`
    SELECT id, name, login, role, created_at, is_active
    FROM users
    ORDER BY created_at DESC
  `;
    return users
}

export async function createUser(prevState: any, formData: FormData): Promise<{ success: boolean; login?: string; password?: string; error?: string }> {
    const name = formData.get("name") as string;

    if (!name || name.trim().length === 0) {
        return { success: false, error: "Имя обязательно" };
    }

    const db = getDb();
    const { login, password } = generateCredentials();
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        await db`
      INSERT INTO users (name, login, password_hash, role, is_active)
      VALUES (${name.trim()}, ${login}, ${passwordHash}, ${"user"}, ${true})
    `;

        revalidatePath("/admin/users");
        return { success: true, login, password };

    } catch (error) {
        console.error("Create user error:", error);
        return { success: false, error: "Ошибка при создании пользователя" };
    }
}

export async function toggleUserActive(userId: number): Promise<{ success: boolean; error?: string }> {
    const db = getDb();

    try {
        const users = await db<{ is_active: boolean }[]>`
            SELECT is_active FROM users WHERE id = ${userId}
        `;

        if (users.length === 0) {
            return { success: false, error: "Пользователь не найден" };
        }

        const newStatus = !users[0].is_active;

        await db`
            UPDATE users 
            SET is_active = ${newStatus}
            WHERE id = ${userId}
        `;

        if (!newStatus) {
            await db`DELETE FROM sessions WHERE user_id = ${userId}`;
        }

        revalidatePath("/admin/users");
        return { success: true };

    } catch (error) {
        console.error("Toggle user error:", error);
        return { success: false, error: "Ошибка при изменении статуса" };
    }
}

export const deleteUser = async (userId: number): Promise<{ success: boolean; error?: string }> => {
    return toggleUserActive(userId);
}