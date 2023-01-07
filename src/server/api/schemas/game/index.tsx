import { z } from "zod";

export const gameCreateSchema = z.object({
  winnerId: z.number(),
  loserId: z.number(),
  winnerScore: z.number(),
  loserScore: z.number(),
});
