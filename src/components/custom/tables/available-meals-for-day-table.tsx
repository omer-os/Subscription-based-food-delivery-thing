import React from "react";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Meal } from "~/lib/types";

export default function AvailableMealsForDayTable({
  meals,
}: {
  meals: Meal[];
}) {
  return (
    <div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Meal Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Meal Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal.mealId}>
              <TableCell className="font-medium">{meal.title}</TableCell>
              <TableCell>{meal.description}</TableCell>
              <TableCell>{meal.mealType}</TableCell>
              <TableCell className="space-x-3 text-right">
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
