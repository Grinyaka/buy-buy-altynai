"use client";

import { useActionState, useState } from "react";
import { createUser } from "@/app/actions/admin";

const CreateUserForm = () => {
  const [state, formAction, isPending] = useActionState(createUser, null);
  const [showSuccess, setShowSuccess] = useState(false);

  if (state?.success && !showSuccess) {
    setShowSuccess(true);
  }

  return (
    <div>
      <h2>Создать нового пользователя</h2>
      
      <form action={formAction} >
        <div>
          <label>Имя сотрудника</label>
          <input
            type="text"
            name="name"
            placeholder="Например: Иван Петров"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Создание..." : "+ Создать"}
        </button>
      </form>

      {state?.success && (
        <div>
          <p >Пользователь создан!</p>
          <p >Логин: <strong>{state.login}</strong></p>
          <p >Пароль: <strong>{state.password}</strong></p>
          <p >
            Сохраните эти данные перед закрытием окна.
          </p>
        </div>
      )}

      {state?.error && (
        <div>
          {state.error}
        </div>
      )}
    </div>
  );
}

export default CreateUserForm