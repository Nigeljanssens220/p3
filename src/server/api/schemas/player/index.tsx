import { z } from "zod";

export const playerCreateSchema = z.object({
  name: z
    .string({ required_error: "Name should contain at least 1 character" })
    .min(1, { message: "Name should contain at least 1 character" })
    .max(255),
  email: z.string().email().min(1).max(255),
});
