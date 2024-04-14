import {
  badNumberFormatError,
  invalidStringLengthError,
  positiveNumberError,
  requiredError,
} from "@/lib/constants";
import { z } from "zod";

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
});
