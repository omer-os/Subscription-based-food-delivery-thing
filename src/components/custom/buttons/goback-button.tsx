"use client";
import { VariantProps } from "class-variance-authority";
import React from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export interface GoBackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  withIcon?: boolean;
}
export default function GoBackButton({
  children,
  withIcon = true,
  ...props
}: GoBackButtonProps) {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} {...props}>
      {withIcon && <ChevronLeft size={16} />}
      {children}
    </Button>
  );
}
