import { z } from "zod";
import { baseFormSchema } from "./baseFormSchema";

export type BaseFormSchema = z.infer<typeof baseFormSchema>;
