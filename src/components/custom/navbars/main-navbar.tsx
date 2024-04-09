import React from "react";
import { Avatar } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import AccountAvatar from "../avatars/account-avatar";
import SidebarToggleButton from "../buttons/sidebar-toggle-button";

export default function MainNavbar() {
  return (
    <div className="border-b p-3 lg:p-4">
      <div className="flex items-center justify-between">
        <div className="hidden flex-1 lg:flex">
          <Input placeholder="Search" className="bg-muted max-w-sm" />
        </div>
        <AccountAvatar />
        <div className="lg:hidden">
          <SidebarToggleButton />
        </div>
      </div>
    </div>
  );
}
