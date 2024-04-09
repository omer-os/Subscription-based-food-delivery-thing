"use client";
import React, { useState } from "react";
import { z } from "zod";
import AutoForm from "~/components/ui/auto-form";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Day } from "~/lib/types";
import { api } from "~/trpc/react";
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function AddFoodSheet({
  children,
}: {
  children?: React.ReactNode;
}) {
  const addfoodMutation = api.foods.addFood.useMutation();
  const days = api.days.getDays.useQuery();
  const [SelectedDay, setSelectedDay] = useState<null | string>(null);
  const [SelectedMealType, setSelectedMealType] = useState<null | string>(null);

  const [SelectedDays, setSelectedDays] = useState<Day[]>([]);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button>{children}</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Food</SheetTitle>
          </SheetHeader>
          <div className="py-5">
            <AutoForm
              formSchema={schema}
              onSubmit={(data) => {
                if (SelectedDays.length === 0) {
                  return;
                }
                addfoodMutation.mutate({
                  name: data.title,
                  description: data.description,
                  availability: SelectedDays.map((day) => ({
                    day: day.day,
                    mealTime: SelectedMealType,
                  })),
                  nutritionalInfo: {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fats: 0,
                  },
                  price: 2000,
                });
              }}
            >
              {days.data?.map((day) => (
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedDays([...SelectedDays, day]);
                        } else {
                          setSelectedDays(
                            SelectedDays.filter((d) => d.id !== day.id),
                          );
                        }
                      }}
                    >
                      {day.day}
                    </Checkbox>
                    <label
                      htmlFor="day"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {day.day}
                    </label>
                  </div>
                </div>
              ))}

              {SelectedDays.length > 0 &&
                SelectedDays.map((day, index) => (
                  <>
                    <FormItem key={index}>
                      <FormLabel>Meal Type for {day.day}</FormLabel>
                      <Select
                        onValueChange={(value) => setSelectedMealType(value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Meal Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {day.meals.map((meal) => (
                            <SelectItem value={meal.mealType}>
                              {meal.mealType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  </>
                ))}

              <Button type="submit">Submit</Button>
            </AutoForm>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
