import { z } from "zod";

const invalidNumberError = "Må være et gyldig tall";
const invalidPositiveNumberError = "Må være et gyldig, positivt tall";

export const baseFormSchema = z.object({
  salary: z.coerce
    .number({ invalid_type_error: invalidNumberError })
    .positive(invalidPositiveNumberError),
  taxes: z.coerce
    .number({ invalid_type_error: invalidNumberError })
    .positive(invalidPositiveNumberError),
});
