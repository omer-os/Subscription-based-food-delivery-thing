import React from "react";
import { User } from "~/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="border">
      <Table>
        <TableCaption>A list of Current Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">name</TableHead>
            <TableHead>email</TableHead>
            <TableHead>verified</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
              <TableCell className="text-right">
                <button className="text-blue-500">Edit</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
