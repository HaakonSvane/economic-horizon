import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/CurrencyInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EmptyFormFields } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { baseFormSchema } from "./baseFormSchema";
import { BaseFormSchema } from "./types";
import { useStore } from "@/lib/store";

export type BaseFormContentProps = {
  onSubmit: (data: BaseFormSchema) => void;
};

export const BaseFormContent = ({ onSubmit }: BaseFormContentProps) => {
  const baseInfo = useStore((state) => state.baseInfo);
  const form = useForm<
    EmptyFormFields<BaseFormSchema>,
    unknown,
    BaseFormSchema
  >({
    resolver: zodResolver(baseFormSchema),
    mode: "onBlur",
    values: {
      salary: baseInfo.salary,
      taxes: baseInfo.taxes,
    },
    defaultValues: {
      salary: "",
      taxes: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-4 gap-y-6"
      >
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Årslønn</FormLabel>
              <FormControl>
                <CurrencyInput {...field} placeholder="Total årslønn..." />
              </FormControl>
              <FormDescription>
                Den totale årslønnen din før skatt
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skatt</FormLabel>
              <FormControl>
                <CurrencyInput {...field} placeholder="Total skatt..." />
              </FormControl>
              <FormDescription>Din totale skatt for året</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Lagre</Button>
      </form>
    </Form>
  );
};
