import Link from "next/link";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

export default function AvailableDaysCard({
  availableDays,
}: {
  availableDays: {
    name: string;
    href: string;
  }[];
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Available Days</h1>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {availableDays.map((day, index) => (
          <Card>
            <CardHeader>
              <CardTitle>{day.name}</CardTitle>
              <CardDescription>
                Available meals for {day.name.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                className={cn(
                  buttonVariants({
                    size: "sm",
                  }),
                )}
                href={day.href}
              >
                View meals
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
