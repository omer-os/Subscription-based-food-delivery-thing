import { z } from "zod";
import { User } from "~/lib/types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/firebase/firebase-admin";

export const usersRoute = createTRPCRouter({
  // Existing create method
  // create: protectedProcedure
  //   .input(z.object({ msg: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     const post = {
  //       userId: ctx.session.user.id, // Assuming the session includes user ID
  //       userName: ctx.session.user.name,
  //       msg: input.msg,
  //       createdAt: new Date(), // Firebase Admin SDK uses Date objects
  //     };

  //     const docRef = await db.collection("posts").add(post);

  //     return {
  //       id: docRef.id,
  //       ...post,
  //     };
  //   }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map((doc) => doc.data());

    return users as User[];
  }),
});
