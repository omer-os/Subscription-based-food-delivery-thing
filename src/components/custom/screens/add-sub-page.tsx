"use client";
import React from "react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const subscriptionItemSchema = z.object({
  mealId: z.string(),
  day: z.enum([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]),
  mealType: z.enum(["breakfast", "lunch", "dinner"]),
});

const subscriptionSchema = z.object({
  items: z.array(subscriptionItemSchema),
  startDate: z.date(),
  endDate: z.date().optional(),
});

export default function AddSubPage() {
  const mutation = api.subscriptions.createSubscription.useMutation();
  return (
    <div>
      <Button
        onClick={async () => {
          mutation.mutate({
            items: [
              {
                day: "Friday",
                mealId: "PkfqpDnpBZ9K9kajoQVX",
                mealType: "breakfast",
              },
            ],
            startDate: new Date(),
            endDate: new Date(),
          });
        }}
      >
        Add Subscription
      </Button>
    </div>
  );
}
