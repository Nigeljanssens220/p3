import EloRank from "elo-rank";
import {
  rankedGameCreateSchema,
  unrankedGameCreateSchema,
} from "../schemas/game";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const gameRouter = createTRPCRouter({
  createUnranked: publicProcedure
    .input(unrankedGameCreateSchema)
    .mutation(async ({ input, ctx }) => {
      // if not a ranked game, just create the game. Default is false
      ctx.prisma.game.create({
        data: {
          winnerId: input.winnerId.value,
          loserId: input.loserId.value,
          winnerScore: parseInt(input.winnerScore),
          loserScore: parseInt(input.loserScore),
        },
      });
    }),
  createRanked: publicProcedure
    .input(rankedGameCreateSchema)
    .mutation(async ({ input, ctx }) => {
      // Get players
      const playerA = await ctx.prisma?.player.findUnique({
        where: {
          id: input.winnerId.value,
        },
      });
      const playerB = await ctx.prisma?.player.findUnique({
        where: {
          id: input.loserId.value,
        },
      });

      // Instantiate EloRank with k-factor 100
      const elo = new EloRank(100);

      // Gets expected score per player
      const expectedScoreA = elo.getExpected(
        playerA?.eloRating as number,
        playerB?.eloRating as number
      );

      const expectedScoreB = elo.getExpected(
        playerB?.eloRating as number,
        playerA?.eloRating as number
      );

      // update score, 1 if won 0 if lost
      const newPlayerA = elo.updateRating(
        expectedScoreA,
        1,
        playerA?.eloRating as number
      );
      const newPlayerB = elo.updateRating(
        expectedScoreB,
        0,
        playerB?.eloRating as number
      );

      // update both players in the database
      await ctx.prisma?.player.update({
        where: {
          id: playerA?.id,
        },
        data: {
          eloRating: newPlayerA,
        },
      });
      await ctx.prisma?.player.update({
        where: {
          id: playerB?.id,
        },
        data: {
          eloRating: newPlayerB,
        },
      });

      // create the ranked game
      await ctx.prisma.game.create({
        data: {
          ranked: true,
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
