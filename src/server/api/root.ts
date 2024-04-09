import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { usersRoute } from "./routers/users";

export const appRouter = createTRPCRouter({
  post: postRouter,
  users: usersRoute,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
