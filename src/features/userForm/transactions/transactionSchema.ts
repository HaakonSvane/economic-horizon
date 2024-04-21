import {
  badNumberFormatError,
  invalidStringLengthError,
  positiveNumberError,
  requiredError,
} from "@/lib/constants";
import { z } from "zod";

const withdrawalBaseSchema = z.object({
  type: z.literal("withdrawal"),
  accountId: z.object({
    savingsId: z
      .string({ required_error: requiredError })
      .min(1, invalidStringLengthError),
  }),
});

const depositBaseSchema = z.object({
  type: z.literal("deposit"),
  accountId: z.union(
    [
      z.object({
        loanId: z
          .string({ required_error: requiredError })
          .min(1, invalidStringLengthError),
      }),
      z.object({
        savingsId: z
          .string({ required_error: requiredError })
          .min(1, invalidStringLengthError),
      }),
    ],
    { required_error: requiredError }
  ),
});

const withdrawalDepositBaseSchema = z.discriminatedUnion("type", [
  withdrawalBaseSchema,
  depositBaseSchema,
]);

const oncePaymentFrequencyBase = z.object({
  paymentFrequency: z.literal("once"),
  on: z.date({ required_error: requiredError }),
});

const reccuringPaymentFrequencyBase = z.object({
  paymentFrequency: z.literal("recurring"),
  interval: z.object({
    every: z
      .number({
        invalid_type_error: badNumberFormatError,
        required_error: requiredError,
      })
      .positive(positiveNumberError),
    period: z.enum(["days", "weeks", "months", "years"]),
    on: z.date({ required_error: requiredError }),
  }),
});

const paymentFrequencyBase = z.discriminatedUnion("paymentFrequency", [
  oncePaymentFrequencyBase,
  reccuringPaymentFrequencyBase,
]);

const transactionBaseSchema = z.object({
  name: z
    .string({ required_error: requiredError })
    .min(1, invalidStringLengthError),
  amount: z.coerce
    .number({
      invalid_type_error: invalidStringLengthError,
      required_error: requiredError,
    })
    .positive(positiveNumberError),
});

export const transactionSchema = withdrawalDepositBaseSchema
  .and(paymentFrequencyBase)
  .and(transactionBaseSchema);
