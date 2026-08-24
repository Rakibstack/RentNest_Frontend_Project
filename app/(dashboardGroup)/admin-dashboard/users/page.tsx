import { getAllUsers } from "../../_action/admin_action/getAllUsers";
import UserList from "../../_components/admin-components/UserList";


export default async function UsersPage() {
  const result = await getAllUsers();

  const users = result?.data ?? [];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Users
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage all users from your dashboard.
          </p>
        </div>

        <UserList users={users} />
      </div>
    </main>
  );
}