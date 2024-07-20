import { z } from "zod";
import { baseSavingsSchema } from "./baseSavingsSchema";
import {
  badNumberFormatError,
  invalidPercentageError,
  positiveNumberError,
  requiredError,
} from "@/lib/constants";

export const fundSchema = z.intersection(
  baseSavingsSchema,
  z.object({
    projectedInterestRate: z.coerce
      .number({
        invalid_type_error: badNumberFormatError,
        required_error: requiredError,
      })
      .positive(positiveNumberError)
      .max(100, invalidPercentageError)
      .transform((val) => val / 100),
  })
);
