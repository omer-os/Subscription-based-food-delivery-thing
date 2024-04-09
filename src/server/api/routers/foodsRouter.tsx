// server/routers/foodsRouter.ts

import { z } from "zod";
import { db } from "~/server/firebase/firebase-admin";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const foodAvailabilitySchema = z.object({
  day: z.enum([
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]),
  mealTime: z.enum(["breakfast", "lunch", "dinner"]),
});

const foodSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  nutritionalInfo: z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fats: z.number(),
  }),
  availability: z.array(foodAvailabilitySchema),
});

export const foodsRouter = createTRPCRouter({
  // Add a new food
  addFood: protectedProcedure
    .input(foodSchema) // Omit id for creation
    .mutation(async ({ input }) => {
      const docRef = await db.collection("foods").add(input);
      return { id: docRef.id, ...input };
    }),

  // Update an existing food
  updateFood: protectedProcedure
    .input(foodSchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await db.collection("foods").doc(id).update(data);
      return { id, ...data };
    }),

  // Remove a food
  removeFood: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.collection("foods").doc(input.id).delete();
      return { id: input.id };
    }),

  // Get all foods
  getFoods: protectedProcedure.query(async () => {
    const snapshot = await db.collection("foods").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }),

  // Optionally, add more methods as needed
});
