import { z } from "zod";

const badNumberFormatError = "Ikke et gyldig tall";
const requiredError = "Feltet er påkrevd";
const positiveNumberError = "Må være et positivt tall";

export const loanSchema = z
  .object({
    type: z.enum(["car", "house", "student", "other"]),
    name: z.string().min(1, "Feltet er påkrevd").nullable(),
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
      .max(100, "Kan ikke være over 100%"),
    paymentPlanOption: z.enum(["annuity", "series"]),
  })
  .refine(
    (data) => {
      if (data.type === "other") return !!data.name;
      return true;
    },
    {
      path: ["name"],
      message: "Feltet er påkrevd",
    }
  );
