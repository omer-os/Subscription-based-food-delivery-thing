"use client";
import React from "react";
import SidebarMenu from "../menu/sidebar-menu";
import { useAtom } from "jotai";
import { sidebarAtom } from "~/lib/atoms";
import { cn } from "~/lib/utils";
import SidebarToggleButton from "../buttons/sidebar-toggle-button";

export default function Mainsidebar() {
  const [isOpen, setIsOpen] = useAtom(sidebarAtom);

  return (
    <div
      className={cn(
        "bg-background fixed bottom-0 start-0 top-0 z-50 h-full w-full border-e transition-all  lg:relative lg:w-[20em]",
        {
          "-start-full lg:start-0": !isOpen,
        },
      )}
    >
      <div className="flex flex-col">
        <div className="logo-area flex items-center gap-2 p-3 text-2xl font-bold lg:p-4">
          <img className="w-14h-14 h-14" src="/images/logo.png" alt="logo" />
          <p className="flex-1 ">Next Dish</p>
          <div className="lg:hidden">
            <SidebarToggleButton />
          </div>
        </div>

        <div className="p-4">
          <SidebarMenu />
        </div>
      </div>
    </div>
  );
}
