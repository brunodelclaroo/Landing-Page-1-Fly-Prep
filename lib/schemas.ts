import { z } from "zod";

export const waitlistSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Name too short")
    .max(60, "Name too long"),
  whatsapp: z
    .string()
    .regex(
      /^\+55\s\(\d{2}\)\s\d{4,5}-\d{4}$/,
      "Invalid Brazilian WhatsApp format",
    ),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
