"use client";
import React from "react";
import SubscriptionsPage from "~/components/custom/screens/subscriptions-page";
import { Button } from "~/components/ui/button";

export default function page() {
  return (
    <div>
      <SubscriptionsPage />

      <Button onClick={() => {}}>Button</Button>
    </div>
  );
}
