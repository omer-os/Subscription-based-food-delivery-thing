import { z } from "zod";
import { Meal } from "~/lib/types";
import { mealSchema } from "~/lib/zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/firebase/firebase-admin";

export const mealsRoute = createTRPCRouter({
  create: protectedProcedure
    .input(mealSchema.omit({ mealId: true })) // Omit mealId for creation
    .mutation(async ({ input }) => {
      const docRef = await db.collection("meals").add(input);
      return { mealId: docRef.id, ...input };
    }),

  update: protectedProcedure.input(mealSchema).mutation(async ({ input }) => {
    const { mealId, ...data } = input;
    if (!mealId) {
      throw new Error("mealId is undefined");
    }
    await db.collection("meals").doc(mealId).update(data);
    return { mealId, ...data };
  }),

  remove: protectedProcedure
    .input(z.object({ mealId: z.string() }))
    .mutation(async ({ input }) => {
      await db.collection("meals").doc(input.mealId).delete();
      return { mealId: input.mealId };
    }),

  getAll: protectedProcedure.query(async () => {
    const snapshot = await db.collection("meals").get();
    return snapshot.docs.map(
      (doc) => ({ mealId: doc.id, ...doc.data() }) as Meal,
    );
  }),

  // Fetch a single meal by mealId
  getOne: protectedProcedure
    .input(z.object({ mealId: z.string() }))
    .query(async ({ input }) => {
      const doc = await db.collection("meals").doc(input.mealId).get();
      if (!doc.exists) {
        throw new Error("Meal not found");
      }
      return { mealId: doc.id, ...doc.data() };
    }),

  getByDay: protectedProcedure
    .input(
      z.object({
        day: z.enum([
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ]),
      }),
    )
    .query(async ({ input }) => {
      const { day } = input;
      const snapshot = await db
        .collection("meals")
        .where("availableDays", "array-contains", day)
        .get();

      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map(
        (doc) => ({ mealId: doc.id, ...doc.data() }) as Meal,
      );
    }),
});
