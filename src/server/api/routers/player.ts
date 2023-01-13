import { z } from "zod";
import { playerCreateSchema } from "../schemas/player";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const playerRouter = createTRPCRouter({
  create: publicProcedure
    .input(playerCreateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.player.upsert({
        where: { email: input.email },
        update: { name: input.name },
        create: { name: input.name, email: input.email },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.player.findMany({ orderBy: { eloRating: "desc" } });
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.player.findUnique({
        where: { id: input.id },
        include: {
          GamesWon: true,
          GamesLost: true,
        },
      });
    }),
});
