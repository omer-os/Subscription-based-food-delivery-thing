import React from "react";
import GoBackButton from "~/components/custom/buttons/goback-button";
import AvailableMealsForDayTable from "~/components/custom/tables/available-meals-for-day-table";
import { api } from "~/trpc/server";
function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export default async function Page({
  params,
}: {
  params: {
    dayId: string;
  };
}) {
  const meals = await api.meals.getByDay({
    day: capitalizeString(params.dayId),
  });

  return (
    <div className="p-4">
      <GoBackButton variant={"secondary"} className="mb-3">
        Go back
      </GoBackButton>
      <div className="text-xl font-bold">
        Available meals for {params.dayId}
      </div>

      <div className="mt-3">
        <AvailableMealsForDayTable meals={meals} />
      </div>
    </div>
  );
}
