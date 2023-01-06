import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const playerRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.player.create({ data: { name: input.name } });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.player.findMany();
  }),
});
