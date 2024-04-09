import { z } from "zod";

export const nutritionalInfoSchema = z.object({
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fats: z.number(),
});

export const mealSchema = z.object({
  mealId: z.string().optional(), // Optional for creation
  title: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
  nutritionalInfo: nutritionalInfoSchema,
  mealType: z.enum(["breakfast", "lunch", "dinner"]),
  availableDays: z.array(
    z.enum([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]),
  ),
});

const subscriptionItemSchema = z.object({
  mealId: z.string(),
  day: z.enum([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]),
  mealType: z.enum(["breakfast", "lunch", "dinner"]),
});

export const subscriptionSchema = z.object({
  userId: z.string().optional(),
  items: z.array(subscriptionItemSchema),
  startDate: z.date(),
  endDate: z.date().optional(),
  totalCost: z.number().optional(),
});
