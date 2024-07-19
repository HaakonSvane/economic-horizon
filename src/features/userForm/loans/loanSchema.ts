import {
  badNumberFormatError,
  invalidPercentageError,
  positiveNumberError,
  requiredError,
} from "@/lib/constants";
import { z } from "zod";

export const loanSchema = z
  .object({
    type: z.enum(["car", "house", "student", "other"]),
    name: z.string().min(1, requiredError).nullable(),
    amountLeft: z.coerce
      .number({
        invalid_type_error: badNumberFormatError,
        required_error: requiredError,
      })
      .positive(positiveNumberError),
    lastPayment: z.coerce
      .number({
        invalid_type_error: badNumberFormatError,
        required_error: requiredError,
      })
      .positive(positiveNumberError),
    termDate: z.date({
      required_error: requiredError,
    }),
    interestRate: z.coerce
      .number({
        invalid_type_error: badNumberFormatError,
        required_error: requiredError,
      })
      .positive(positiveNumberError)
      .max(100, invalidPercentageError)
      .transform((val) => val / 100),
    paymentPlanOption: z.enum(["annuity", "series"]),
  })
  .refine(
    (data) => {
      if (data.type === "other") return !!data.name;
      return true;
    },
    {
      path: ["name"],
      message: requiredError,
    }
  );
