import { playerCreateSchema } from "../schemas/player";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const playerRouter = createTRPCRouter({
  create: publicProcedure
    .input(playerCreateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.player.create({
        data: { name: input.name, email: input.email },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.player.findMany();
  }),
});
