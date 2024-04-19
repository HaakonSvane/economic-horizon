import { CurrencyInput } from "@/components/CurrencyInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyFormFields, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { LoanTypeDisplay } from "./LoanTypeDisplay";
import { loanSchema } from "./loanSchema";
import { LoanFormSchema } from "./types";
import { PercentageInput } from "@/components/PercentageInput";

export type LoanFormProps = {
  onValidSubmit: (data: LoanFormSchema) => void;
};

export const LoanForm = ({ onValidSubmit }: LoanFormProps) => {
  const form = useForm<
    EmptyFormFields<LoanFormSchema>,
    unknown,
    LoanFormSchema
  >({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      type: "",
      name: null,
      paymentPlanOption: "",
      lastPayment: "",
      amountLeft: "",
      interestRate: "",
      termDate: null,
    },
  });

  const currentType = useWatch({ name: "type", control: form.control });
  useEffect(() => {
    if (currentType === "student") {
      form.setValue("paymentPlanOption", "annuity");
    }
  }, [form, currentType]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="grid grid-cols-1 gap-y-6"
      >
        <div
          className={`grid gap-x-2 grid-cols-${currentType === "other" ? "2" : "1"}`}
        >
          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type lån</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Velg her..." />
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
                <FormMessage />
              </FormItem>
            )}
          />
          {currentType === "other" && (
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Navn på lån</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Navn på lån..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          name="paymentPlanOption"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Betalingsplan</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  disabled={currentType === "student"}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="annuity" />
                    </FormControl>
                    <FormLabel className="font-normal">Annuitetslån</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="series" />
                    </FormControl>
                    <FormLabel className="font-normal">Serielån</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="interestRate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Effektiv rente (%)</FormLabel>
              <FormControl>
                <PercentageInput {...field} placeholder="Rente..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-x-2">
          <FormField
            name="amountLeft"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gjenstående beløp</FormLabel>
                <FormControl>
                  <CurrencyInput
                    {...field}
                    placeholder="Gjenstående beløp..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="lastPayment"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sist betalte beløp</FormLabel>
                <FormControl>
                  <CurrencyInput {...field} placeholder="Beløp..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="termDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Betalingsdato</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex grow gap-x-2 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Velg dato for neste betaling</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ?? new Date()}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <DrawerDialogFooter>
          <DrawerDialogClose asChild>
            <Button variant="outline">Lukk</Button>
          </DrawerDialogClose>
          <Button type="submit">Legg til lån</Button>
        </DrawerDialogFooter>
      </form>
    </Form>
  );
};
