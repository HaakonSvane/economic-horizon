import { z } from "zod";
import { transactionSchema } from "./transactionSchema";

export type TransactionSchema = z.infer<typeof transactionSchema>;
