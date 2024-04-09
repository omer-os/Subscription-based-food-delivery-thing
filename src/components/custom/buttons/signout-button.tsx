"use client";
import { signOut } from "next-auth/react";
import { VariantProps } from "class-variance-authority";
import React from "react";
import { Button, buttonVariants } from "~/components/ui/button";

export interface SignoutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export default function SignoutButton({
  children,
  ...props
}: SignoutButtonProps) {
  return (
    <Button onClick={() => signOut()} {...props}>
      {children}
    </Button>
  );
}
