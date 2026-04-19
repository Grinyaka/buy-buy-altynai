"use client";

import { useEffect, useState } from "react";
import type { UserPayload } from "@/lib/types";
import { getCurrentUser } from "@/app/actions/auth";

export default function DashboardPage() {
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <div>
      <h1>Панель управления</h1>
      
      {user && (
        <div>
          <p>Добро пожаловать, <strong>{user.name}</strong>!</p>
          <p>Здесь будет форма закупок.</p>
        </div>
      )}
    </div>
  );
}