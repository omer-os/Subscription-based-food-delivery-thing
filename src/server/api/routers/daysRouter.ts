import { z } from "zod";
import { Day, Meal } from "~/lib/types";
import { mealSchema } from "~/lib/zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/firebase/firebase-admin";

const dayMealInfoSchema = z.object({
  mealType: z.enum(["breakfast", "lunch", "dinner"]),
  deliveryTime: z.string(),
});

const serviceDaySchema = z.object({
  day: z.string(),
  meals: z.array(dayMealInfoSchema),
});

export const daysRouter = createTRPCRouter({
  addDay: protectedProcedure
    .input(serviceDaySchema)
    .mutation(async ({ input }) => {
      const docRef = await db.collection("days").add(input);
      return { id: docRef.id, ...input };
    }),

  // Update an existing service day
  updateDay: protectedProcedure
    .input(serviceDaySchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await db.collection("days").doc(id).update(data);
      return { id, ...data };
    }),

  // Remove a service day
  removeDay: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.collection("days").doc(input.id).delete();
      return { id: input.id };
    }),

  // Get all service days
  getDays: protectedProcedure.query(async () => {
    const snapshot = await db.collection("days").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Day);
  }),
});
