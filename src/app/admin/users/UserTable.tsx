"use client";

import { useState } from "react";
import { toggleUserActive } from "@/app/actions/admin";
import type { User } from "@/lib/types";

const UserTable = ({ users: initialUsers }: { users: User[] }) => {
    const [users, setUsers] = useState(initialUsers);
    const [loading, setLoading] = useState<number | null>(null);

    async function handleToggle(userId: number, currentStatus: boolean) {
        setLoading(userId);
        const result = await toggleUserActive(userId);

        if (result.success) {
            setUsers(prev => prev.map(user =>
                user.id === userId
                    ? { ...user, is_active: !currentStatus }
                    : user
            ));
        } else {
            alert(result.error);
        }

        setLoading(null);
    }

    if (users.length === 0) {
        return (
            <div >
                Нет пользователей
            </div>
        );
    }

    return (
        <div >
            <table >
                <thead >
                    <tr>
                        <th >Имя</th>
                        <th >Логин</th>
                        <th >Роль</th>
                        <th >Статус</th>
                        <th >Действия</th>
                    </tr>
                </thead>
                <tbody >
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td >{user.name}</td>
                            <td>{user.login}</td>
                            <td >
                                <span>
                                    {user.role === "admin" ? "Админ" : "Пользователь"}
                                </span>
                            </td>
                            <td>
                                <span>
                                    {user.is_active ? "Активен" : "Заблокирован"}
                                </span>
                            </td>
                            <td>
                                {user.role !== 'admin' && (
                                    <button
                                        onClick={() => handleToggle(user.id, user.is_active)}
                                        disabled={loading === user.id}
                                    >
                                        {loading === user.id
                                            ? "..."
                                            : user.is_active
                                                ? "Заблокировать"
                                                : "Активировать"}
                                    </button>
                                )}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable