"use client";
import { useAtom } from "jotai";
import { Menu, X } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { sidebarAtom } from "~/lib/atoms";

export default function SidebarToggleButton() {
  const [isOpen, setIsOpen] = useAtom(sidebarAtom);

  return (
    <Button onClick={() => setIsOpen(!isOpen)} variant={"ghost"} size={"icon"}>
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </Button>
  );
}
