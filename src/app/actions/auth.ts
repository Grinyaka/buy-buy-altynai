"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import type { User, UserPayload } from "@/lib/types";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "coffee-shop-secret-key"
);


async function createToken(user: User): Promise<string> {
  return await new SignJWT({
    id: user.id,
    name: user.name,
    login: user.login,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function getCurrentUser(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  
  if (!token) return null;
  
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserPayload;
  } catch (error) {
    return null;
  }
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin";
}

export async function login(prevState: any, formData: FormData) {
  const login = formData.get("login") as string;
  const password = formData.get("password") as string;

  const db = getDb();
  const users = await db<User[]>`
    SELECT * FROM users 
    WHERE login = ${login} AND is_active = true
    LIMIT 1
  `;

  if (users.length === 0) {
    return { error: "Неверный логин или пароль" };
  }

  const user = users[0];
  const isValid = await bcrypt.compare(password, user.password_hash);
  
  if (!isValid) {
    return { error: "Неверный логин или пароль" };
  }

  const token = await createToken(user);
  
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(user.role === "admin" ? "/admin/users" : "/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/login");
}