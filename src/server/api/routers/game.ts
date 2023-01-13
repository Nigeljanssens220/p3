import { gameCreateSchema } from "../schemas/game";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const gameRouter = createTRPCRouter({
  create: publicProcedure.input(gameCreateSchema).mutation(({ input, ctx }) => {
    console.log(input);
    return ctx.prisma.game.create({
      data: {
        winnerId: input.winnerId.value,
        loserId: input.loserId.value,
        winnerScore: parseInt(input.winnerScore),
        loserScore: parseInt(input.loserScore),
      },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany({
      include: {
        Winner: true,
        Loser: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
