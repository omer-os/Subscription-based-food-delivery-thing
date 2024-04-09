import React from "react";
import MainLayout from "~/components/custom/layouts/main-layout";

export default function layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
