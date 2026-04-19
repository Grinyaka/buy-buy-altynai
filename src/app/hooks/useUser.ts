"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  login: string;
  role: "admin" | "user";
};

export async function fetchUser(): Promise<User | null> {
  const res = await fetch("/api/me");
  if (!res.ok) return null;
  return res.json();
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser().then(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}