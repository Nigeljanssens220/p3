import { z } from "zod";
import { playerCreateSchema } from "../schemas/player";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const playerRouter = createTRPCRouter({
  create: publicProcedure
    .input(playerCreateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.player.upsert({
        where: { email: input.email },
        update: { name: input.name },
        create: { name: input.name, email: input.email },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.player.findMany({
      include: {
        GamesWon: true,
        GamesLost: true,
      },
    });
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.player.findUnique({
        where: { id: input.id },
        include: {
          GamesWon: true,
          GamesLost: true,
        },
      });
    }),
});
