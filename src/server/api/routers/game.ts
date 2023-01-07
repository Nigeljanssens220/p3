import { gameCreateSchema } from "../schemas/game";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const gameRouter = createTRPCRouter({
  create: publicProcedure.input(gameCreateSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.game.create({
      data: {
        winnerId: input.winnerId,
        loserId: input.loserId,
        winnerScore: input.winnerScore,
        loserScore: input.loserScore,
      },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany();
  }),
});
