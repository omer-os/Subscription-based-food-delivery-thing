"use client";
import React from "react";
import FoodsTable from "../tables/foods-table";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import AddFoodSheet from "../sheets/add-food-sheet";

export default function FoodsPage() {
  const Foods = api.foods.getFoods.useQuery();

  return (
    <div>
      <div className="text-2xl font-bold">Available Foods</div>

      <div className="my-4">
        <FoodsTable foods={Foods.data ?? []} />
      </div>

      <AddFoodSheet>Add Foos</AddFoodSheet>
    </div>
  );
}
