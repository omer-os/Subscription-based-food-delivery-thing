import React from "react";
import MainNavbar from "../navbars/main-navbar";
import Mainsidebar from "../sidebars/main-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Mainsidebar />
      <div className="flex h-full flex-1 flex-col">
        <MainNavbar />
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
}
