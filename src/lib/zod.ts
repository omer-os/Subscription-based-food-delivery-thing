import { z } from "zod";

const nutritionalInfoSchema = z.object({
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
