import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { usersRoute } from "./routers/users";
import { mealsRoute } from "./routers/meals";
import { subscriptionsRoute } from "./routers/subscriptions";

export const appRouter = createTRPCRouter({
  post: postRouter,
  users: usersRoute,
  meals: mealsRoute,
  subscriptions: subscriptionsRoute,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
