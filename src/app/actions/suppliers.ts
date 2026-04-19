"use server";

import { getDb } from "@/lib/db"
import { Product, Supplier } from "@/lib/types"
import { revalidatePath } from "next/cache"

export const getSuppliersList = async (): Promise<Supplier[]> => {
    const db = getDb()
    const suppliers = await db<Supplier[]>`
        SELECT *
        FROM suppliers
        ORDER BY is_active DESC
    `
    return suppliers
}

export const getProductsBySupplier = async (supplierId: number): Promise<Product[]> => {
    const db = getDb()

    const products = await db<Product[]>`
      SELECT id, name, supplier_id, max_stock, unit, is_active, created_at
      FROM products
      WHERE supplier_id = ${supplierId}
      ORDER BY name ASC
    `;
    return products
}

export const createSupplier = async (prevState: any, formData: FormData) => {
    const name = formData.get("name") as string;

    if (!name || name.trim().length === 0) {
        return { success: false, error: "Имя обязательно" };
    }

    const db = getDb();
    try {
        await db`
        INSERT INTO suppliers (name)
        VALUES (${name})
    `

        revalidatePath("/admin/suppliers");
        return { success: true, name };

    } catch (error) {
        console.error("Create supplier error:", error);
        return { success: false, error: "Ошибка при добавлении поставщика" };
    }
}

export const getProducts = async () => {
    const db = getDb();
    const products = await db<Product[]>`
        SELECT * 
        FROM products
        ORDER BY supplier_id, name
    `

    return products
}