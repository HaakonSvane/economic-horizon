import { Button } from "@/components/ui/button";
import {
  DrawerDialogClose,
  DrawerDialogFooter,
} from "@/components/ui/drawerDialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyFormFields } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoanTypeDisplay } from "./LoanTypeDisplay";
import { loanSchema } from "./loanSchema";
import { LoanFormSchema } from "./types";
import { CurrencyInput } from "@/components/CurrencyInput";

export const LoanForm = () => {
  const form = useForm<
    EmptyFormFields<LoanFormSchema>,
    unknown,
    LoanFormSchema
  >({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      type: "",
      amountLeft: "",
      interestRate: "",
      lastPaymentDate: "",
    },
  });

  const onValidSubmit = (data: LoanFormSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)}>
        <FormItem>
          <FormLabel>Type lån</FormLabel>
          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type lån" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">
                      <LoanTypeDisplay type="car" />
                    </SelectItem>
                    <SelectItem value="house">
                      <LoanTypeDisplay type="house" />
                    </SelectItem>
                    <SelectItem value="student">
                      <LoanTypeDisplay type="student" />
                    </SelectItem>
                    <SelectItem value="other">
                      <LoanTypeDisplay type="other" />
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            )}
          />
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Gjenstående beløp</FormLabel>
          <FormField
            name="amountLeft"
            control={form.control}
            render={({ field }) => (
              <FormControl>
                <CurrencyInput {...field} placeholder="Gjenstående beløp..." />
              </FormControl>
            )}
          />
          <FormMessage />
        </FormItem>

        <DrawerDialogFooter>
          <DrawerDialogClose asChild>
            <Button variant="secondary">Lukk</Button>
          </DrawerDialogClose>
          <Button type="submit">Legg til lån</Button>
        </DrawerDialogFooter>
      </form>
    </Form>
  );
};
