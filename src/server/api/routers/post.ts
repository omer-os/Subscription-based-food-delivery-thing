import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/firebase/firebase-admin";

export const postRouter = createTRPCRouter({
  // Existing create method
  create: protectedProcedure
    .input(z.object({ msg: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const post = {
        userId: ctx.session.user.id, // Assuming the session includes user ID
        userName: ctx.session.user.name,
        msg: input.msg,
        createdAt: new Date(), // Firebase Admin SDK uses Date objects
      };

      const docRef = await db.collection("posts").add(post);

      return {
        id: docRef.id,
        ...post,
      };
    }),

  // Get a single post
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const docRef = db.collection("posts").doc(input.id);
      const doc = await docRef.get();
      if (!doc.exists) {
        throw new Error("Post not found");
      }
      return { id: doc.id, ...doc.data() };
    }),

  // Update a post
  update: protectedProcedure
    .input(z.object({ id: z.string(), msg: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const docRef = db.collection("posts").doc(input.id);
      await docRef.update({ msg: input.msg });
      return { id: input.id, msg: input.msg, userName: ctx.session.user.name };
    }),

  // Delete a post
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.collection("posts").doc(input.id).delete();
      return { id: input.id };
    }),

  getAll: publicProcedure.query(async () => {
    const snapshot = await db.collection("posts").get();
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return posts;
  }),
});
