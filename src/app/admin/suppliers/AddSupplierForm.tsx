"use client"

import { createSupplier } from "@/app/actions/suppliers";
import { useActionState } from "react";

const AddSupplierForm = () => {
  const [state, formAction, isPending] = useActionState(createSupplier, null);

  return (
    <div>
      <h2>Добавление поставщика</h2>

      <form action={formAction} >
        <div>
          <label>Имя Поставщика</label>
          <input
            type="text"
            name="name"
            required
            autoComplete="supplier"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Добавление..." : "+ Добавить"}
        </button>
      </form>

      {state?.error && (
        <div>
          {state.error}
        </div>
      )}
    </div>
  )
}

export default AddSupplierForm