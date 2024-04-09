import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

export default async function page() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/signin");
  }

  if (session.user.role !== "admin") {
    return redirect("/auth/not-authorized");
  }

  return <div>page</div>;
}
