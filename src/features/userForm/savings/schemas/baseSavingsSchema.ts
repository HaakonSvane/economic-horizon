import { z } from "zod";

const badNumberFormatError = "Ikke et gyldig tall";
const requiredError = "Feltet er påkrevd";
const positiveNumberError = "Må være et positivt tall";

export const baseSavingsSchema = z.object({
  id: z.string({ required_error: requiredError }),
  name: z.string({ required_error: requiredError }),
  amount: z.coerce
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
  monthlyContribution: z.coerce
    .number({
      invalid_type_error: badNumberFormatError,
      required_error: requiredError,
    })
    .positive(positiveNumberError),
});
