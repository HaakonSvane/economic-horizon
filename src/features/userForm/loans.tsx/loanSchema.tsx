import { z } from "zod";

const badNumberFormatError = "Ikke et gyldig tall";
const requiredError = "Feltet er påkrevd";
const positiveNumberError = "Må være et positivt tall";

export const paymentPlanSchema = z.array(
  z.object({
    date: z
      .string({
        required_error: requiredError,
      })
      .datetime(),
    interest: z.number({}),
  })
);

export const loanSchema = z.object({
  type: z.enum(["car", "house", "student", "other"]),
  amountLeft: z
    .number({
      invalid_type_error: badNumberFormatError,
      required_error: requiredError,
    })
    .positive(positiveNumberError),
  lastPaymentDate: z
    .string({
      required_error: requiredError,
    })
    .datetime(),
  interestRate: z
    .number({
      invalid_type_error: badNumberFormatError,
      required_error: requiredError,
    })
    .positive(positiveNumberError)
    .max(100, "Kan ikke være over 100%"),
  paymentPlan: z.union([z.enum(["fixed"]), paymentPlanSchema]),
});
