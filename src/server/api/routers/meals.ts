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
    await db.collection("meals").doc(mealId).update(data);
    return { mealId, ...data };
  }),

  remove: protectedProcedure
    .input(z.object({ mealId: z.string() }))
    .mutation(async ({ input }) => {
      await db.collection("meals").doc(input.mealId).delete();
      return { mealId: input.mealId };
    }),
});
