"use client";
import React from "react";
import { z } from "zod";
import AutoForm from "~/components/ui/auto-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { FormItem } from "~/components/ui/form";
import { api } from "~/trpc/react";
import GoBackButton from "../buttons/goback-button";

const nutritionalInfoSchema = z.object({
  calories: z.number().min(1, { message: "Calories must be greater than 0" }),
  protein: z.number().min(0, { message: "Protein cannot be negative" }),
  carbs: z.number().min(0, { message: "Carbs cannot be negative" }),
  fats: z.number().min(0, { message: "Fats cannot be negative" }),
});

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  nutritionalInfo: nutritionalInfoSchema,
  mealType: z.enum(["breakfast", "lunch", "dinner"]),

  availableDays: z.object({
    Sunday: z.boolean().optional(),
    Monday: z.boolean().optional(),
    Tuesday: z.boolean().optional(),
    Wednesday: z.boolean().optional(),
    Thursday: z.boolean().optional(),
    Friday: z.boolean().optional(),
    Saturday: z.boolean().optional(),
  }),
});

export default function AddMealPage() {
  const mutateAdd = api.meals.create.useMutation();

  return (
    <div className="p-4">
      <GoBackButton variant={"secondary"}>Go Back</GoBackButton>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Add New Meal</CardTitle>
          <CardDescription>
            Fill in the details of the meal you want to add
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AutoForm
            onSubmit={async (data) => {
              const availableDays = Object.entries(data.availableDays);

              mutateAdd.mutate({
                availableDays: [
                  ...(availableDays
                    .filter(([, value]) => value)
                    .map(([key]) => key) as (
                    | "Sunday"
                    | "Monday"
                    | "Tuesday"
                    | "Wednesday"
                    | "Thursday"
                    | "Friday"
                    | "Saturday"
                  )[]),
                ],
                description: data.description,
                ingredients: [],
                mealType: data.mealType,
                nutritionalInfo: data.nutritionalInfo,
                title: data.title,
              });
            }}
            formSchema={schema}
          >
            <Button type="submit">Submit</Button>
          </AutoForm>
        </CardContent>
      </Card>
    </div>
  );
}
