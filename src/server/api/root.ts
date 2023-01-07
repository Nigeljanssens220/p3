import { gameRouter } from "./routers/game";
import { playerRouter } from "./routers/player";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  player: playerRouter,
  game: gameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
