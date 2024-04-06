import {
  badNumberFormatError,
  invalidStringLengthError,
  positiveNumberError,
  requiredError,
} from "@/lib/constants";
import { z } from "zod";

const contributionSchema = z.object({
  amount: z.coerce
    .number({
      invalid_type_error: invalidStringLengthError,
      required_error: requiredError,
    })
    .positive(positiveNumberError),
  every: z
    .number({
      invalid_type_error: badNumberFormatError,
      required_error: requiredError,
    })
    .positive(positiveNumberError),
  period: z.enum(["days", "weeks", "months", "years"]),
  on: z.date({ required_error: requiredError }),
});

export const baseSavingsSchema = z.object({
  name: z
    .string({ required_error: requiredError })
    .min(1, invalidStringLengthError),
  balance: z.coerce
    .number({
      invalid_type_error: badNumberFormatError,
      required_error: requiredError,
    })
    .positive(positiveNumberError),
  investedAmount: z.coerce
    .number({
      invalid_type_error: badNumberFormatError,
      required_error: requiredError,
    })
    .positive(positiveNumberError),
  ratePeriod: z.union([z.literal("yearly"), z.literal("monthly")]),
  contributionPeriod: contributionSchema.nullable(),
});
