"use client"

import { Supplier } from "@/lib/types";
import { useState } from "react";

const categoryAlias= {
  'common': "общий",
  'bar': 'бар',
  'kitchen': 'кухня'
}

const SuppliersTable = ({ suppliers: initialSuppliers }: { suppliers: Supplier[] }) => {
    const [suppliers, setSuppliers] = useState(initialSuppliers);

    if (suppliers.length === 0) return (
        <div>
            Нет поставщиков
        </div>
    )
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Имя</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id}>
                            <td>{supplier.name}</td>
                            <td>Редактировать</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SuppliersTable