"use client";

import { login } from "@/app/actions/auth";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div>
      <div >
        <h1>Вход в систему</h1>

        <form action={formAction}>
          <div>
            <label >Логин</label>
            <input
              type="text"
              name="login"
              required
            />
          </div>

          <div>
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              required
            />
          </div>

          {state?.error && (
            <div>{state.error}</div>
          )}

          <button
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}