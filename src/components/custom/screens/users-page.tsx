import React from "react";
import UsersTable from "../tables/users-table";
import { api } from "~/trpc/server";

export default async function UsersPage() {
  const users = await api.users.getAll();

  return (
    <div className="p-4">
      <div className="text-xl font-bold">Users Page</div>
      <UsersTable users={users} />
    </div>
  );
}
