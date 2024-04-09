"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import AvailableDaysTable from "../tables/available-days-table";

export default function DaysPage() {
  const allDays = api.days.getDays.useQuery();
  const addDayMutation = api.days.addDay.useMutation();
  return (
    <div>
      <h1 className="text-xl font-bold">
        available days: {allDays.data?.length}
      </h1>

      <AvailableDaysTable days={allDays.data ?? []} />

      <br />
      <Button
        onClick={() => {
          addDayMutation.mutate({
            day: "sunday",
            meals: [
              {
                mealType: "breakfast",
                deliveryTime: "8:00",
              },
            ],
          });
        }}
      >
        add day
      </Button>
    </div>
  );
}
