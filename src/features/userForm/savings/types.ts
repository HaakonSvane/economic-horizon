import { z } from "zod";
import { fundSchema } from "./schemas/fundSchema";
import { savingsAccountSchema } from "./schemas/savingsAccountSchema";

export type FundSchema = z.infer<typeof fundSchema>;
export type SavingsAccountSchema = z.infer<typeof savingsAccountSchema>;
