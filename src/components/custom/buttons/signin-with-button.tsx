"use client";
import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import { VariantProps } from "class-variance-authority";
import React from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { Provider } from "next-auth/providers/index";

export interface SininWithButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  providerId: Provider["id"];
}

export default function SininWithButton({
  children,
  providerId,
  ...props
}: SininWithButtonProps) {
  return (
    <Button
      onClick={() =>
        signIn(providerId, {
          callbackUrl: "/",
          redirect: false,
        })
      }
      {...props}
    >
      {children}
    </Button>
  );
}
