import React from "react";
import { Food, User } from "~/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function FoodsTable({ foods }: { foods: Food[] }) {
  const removeFoodMutation = api.foods.removeFood.useMutation();
  return (
    <div className="border">
      <Table>
        <TableCaption>A list of Current foods.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">name</TableHead>
            <TableHead>price</TableHead>
            <TableHead>availability</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foods.map((food) => (
            <TableRow key={food.id}>
              <TableCell className="font-medium">{food.name}</TableCell>
              <TableCell>{food.price}</TableCell>
              <TableCell>
                {food.availability.map((i, index) => (
                  <Badge key={index}>
                    {i.day} {i.mealTime}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => {
                    removeFoodMutation.mutate({
                      id: food.id,
                    });
                  }}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
