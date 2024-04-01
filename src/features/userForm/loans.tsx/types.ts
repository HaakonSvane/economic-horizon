import { z } from "zod";
import { loanSchema } from "./loanSchema";

export type LoanFormSchema = z.infer<typeof loanSchema>;
