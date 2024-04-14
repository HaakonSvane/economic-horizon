import {
  badNumberFormatError,
  invalidStringLengthError,
  positiveNumberError,
  requiredError,
} from "@/lib/constants";
import { z } from "zod";

export const depositSchema = z.object({
  name: z
    .string({ required_error: requiredError })
    .min(1, invalidStringLengthError),
  amount: z.coerce
    .number({
      invalid_type_error: invalidStringLengthError,
      required_error: requiredError,
    })
    .positive(positiveNumberError),
  savingsId: z.string({ required_error: requiredError }),
  interval: z
    .object({
      every: z
        .number({
          invalid_type_error: badNumberFormatError,
          required_error: requiredError,
        })
        .positive(positiveNumberError),
      period: z.enum(["days", "weeks", "months", "years"]),
      on: z.date({ required_error: requiredError }),
    })
    .nullable(),
});
