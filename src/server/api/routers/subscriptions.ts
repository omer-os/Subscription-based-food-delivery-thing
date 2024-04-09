import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/firebase/firebase-admin";
import { subscriptionSchema } from "~/lib/zod";

export const subscriptionsRoute = createTRPCRouter({
  createSubscription: protectedProcedure
    .input(subscriptionSchema)
    .mutation(async ({ ctx, input }) => {
      const { items, startDate, endDate } = input;

      let totalCost = 0;
      for (const item of items) {
        const mealDoc = await db.collection("meals").doc(item.mealId).get();
        if (mealDoc.exists) {
          const mealData = mealDoc.data();
          totalCost += mealData?.price;
        }
      }
      const subscriptionDoc = await db.collection("subscriptions").add({
        userId: ctx.session.user.id,
        items,
        startDate,
        endDate: endDate || null, // Handle optional endDate
        totalCost,
      });
      return { subscriptionId: subscriptionDoc.id, ...input, totalCost };
    }),
});
