import { getUsers } from "@/app/actions/admin";
import CreateUserForm from "./CreateUserForm";
import UserTable from "./UserTable";

const AdminUsersPage = async () => {
  const users = await getUsers();

  return (
    <div>
      <h1>Управление пользователями</h1>

      <CreateUserForm />

      <UserTable users={users} />
    </div>
  );
}

export default AdminUsersPage