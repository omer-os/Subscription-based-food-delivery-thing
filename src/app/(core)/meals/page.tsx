import React from "react";
import AvailableDaysCard from "~/components/custom/cards/available-days-card";
import { api } from "~/trpc/server";

export default async function Page() {
  const allMeals = await api.meals.getAll();

  return (
    <div className="p-4">
      <AvailableDaysCard
        availableDays={[
          { name: "Sunday", href: "/meals/sunday" },
          { name: "Monday", href: "/meals/monday" },
          { name: "Tuesday", href: "/meals/tuesday" },
          { name: "Wednesday", href: "/meals/wednesday" },
          { name: "Thursday", href: "/meals/thursday" },
          { name: "Friday", href: "/meals/friday" },
          { name: "Saturday", href: "/meals/saturday" },
        ]}
      />
    </div>
  );
}
