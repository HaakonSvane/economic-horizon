import { z } from "zod";
import { depositSchema } from "./depositSchema";

export type DepositSchema = z.infer<typeof depositSchema>;
