"use client";
import React from "react";
import { Day, User } from "~/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";

export default function AvailableDaysTable({ days }: { days: Day[] }) {
  const removeDayMutation = api.days.removeDay.useMutation();

  return (
    <div className="border">
      <Table>
        <TableCaption>A list of Current Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">name</TableHead>
            <TableHead>meals</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {days.map((day) => (
            <TableRow key={day.id}>
              <TableCell className="font-medium">{day.day}</TableCell>
              <TableCell>{day.meals.length}</TableCell>
              <TableCell className="text-right">
                <Button
                  size={"sm"}
                  onClick={() => {
                    removeDayMutation.mutate({
                      id: day.id ?? "",
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
