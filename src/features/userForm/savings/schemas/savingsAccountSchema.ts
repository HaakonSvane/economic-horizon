import { z } from "zod";
import { baseSavingsSchema } from "./baseSavingsSchema";
import {
  badNumberFormatError,
  invalidPercentageError,
  positiveNumberError,
  requiredError,
} from "@/lib/constants";

export const savingsAccountSchema = z.intersection(
  baseSavingsSchema,
  z.object({
    interestRate: z.coerce
      .number({
        invalid_type_error: badNumberFormatError,
        required_error: requiredError,
      })
      .positive(positiveNumberError)
      .max(100, invalidPercentageError),
  })
);
