import { z } from "zod";

export const gameCreateSchema = z
  .object({
    ranked: z.boolean().default(false),
    winnerId: z.object(
      {
        value: z.number(),
        label: z.string(),
      },
      { required_error: "Winner is required" }
    ),
    loserId: z.object(
      {
        value: z.number(),
        label: z.string(),
      },
      { required_error: "Winner is required" }
    ),
    winnerScore: z.string().refine((value) => parseInt(value) > 0, {
      message: "Winner score must be higher than 0",
    }),
    loserScore: z.string({ required_error: "Loser score is required" }),
  })
  .refine((data) => data.winnerId.value !== data.loserId.value, {
    path: ["EqualIdError"],
    message: "Winner and loser cannot be the same",
  })
  .refine((data) => data.winnerScore !== data.loserScore, {
    path: ["EqualScoreError"],
    message: "Winner and loser cannot have the same score",
  })
  .refine(
    (data) => {
      const winnerScore = parseInt(data.winnerScore);
      const loserScore = parseInt(data.loserScore);
      return winnerScore > loserScore;
    },
    {
      path: ["WinnerScoreError"],
      message: "Winner score must be higher than loser score",
    }
  );
