import { badNumberFormatError, positiveNumberError } from "@/lib/constants";
import { z } from "zod";

export const baseFormSchema = z.object({
  salary: z.coerce
    .number({ invalid_type_error: badNumberFormatError })
    .positive(positiveNumberError),
  taxes: z.coerce
    .number({ invalid_type_error: badNumberFormatError })
    .positive(positiveNumberError),
});
