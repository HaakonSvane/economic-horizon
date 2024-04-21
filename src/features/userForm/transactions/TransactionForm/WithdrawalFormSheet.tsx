import { CurrencyInput } from "@/components/CurrencyInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SavingsTypeDisplay } from "@/features/userForm/savings/SavingsTypeDisplay";
import { useStore } from "@/lib/store";
import { EmptyFormFields, cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { TransactionSchema } from "../types";
import { transactionIntervalPeriodToLabel } from "../utils";
import { usePeriodicValues } from "./usePeriodicValues";

export type WithdrawalFormSheetProps = {
  form: UseFormReturn<
    EmptyFormFields<TransactionSchema>,
    unknown,
    TransactionSchema
  >;
};

export const WithdrawalFormSheet = ({ form }: WithdrawalFormSheetProps) => {
  const { possibleEverys } = usePeriodicValues(form);
  const paymentFrequency = useWatch({
    name: "paymentFrequency",
    control: form.control,
  });

  const savings = useStore((state) => state.savings);

  useEffect(() => {
    if (paymentFrequency === "recurring") {
      form.setValue("interval", {
        every: "",
        period: "months",
        on: null,
      });
    }
  }, [paymentFrequency]);

  return (
    <>
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Navn på uttak</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder="Et beskrivende navn på på uttaket..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="amount"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Uttaksmengde</FormLabel>
            <FormControl>
              <CurrencyInput
                {...field}
                value={field.value ?? ""}
                placeholder="Hvor mye du tar ut..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="accountId"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hvor tar du pengene ut fra?</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  const obj = JSON.parse(value);
                  if (typeof obj === "object") {
                    return field.onChange(obj);
                  }
                  return field.onChange(value);
                }}
                value={
                  typeof field.value === "object"
                    ? JSON.stringify(field.value)
                    : ""
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Velg sparekonto eller fond..." />
                </SelectTrigger>
                <SelectContent>
                  {savings.map((savings) => (
                    <SelectItem
                      key={savings.id}
                      value={JSON.stringify({ savingsId: savings.id })}
                    >
                      <SavingsTypeDisplay saving={savings} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="paymentFrequency"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center gap-x-2">
                <Switch
                  id="isRecurringSwitch"
                  checked={field.value === "recurring"}
                  onCheckedChange={(checked) =>
                    checked
                      ? field.onChange("recurring")
                      : field.onChange("once")
                  }
                />
                <Label htmlFor="isRecurringSwitch">
                  Uttaket mitt skjer periodisk
                </Label>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
      {paymentFrequency === "recurring" ? (
        <div className="grid grid-cols-9 gap-x-2">
          <div className="col-span-2">
            <FormField
              name="interval.every"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hver</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder=" " />
                      </SelectTrigger>
                      <SelectContent>
                        {possibleEverys.map((option) => (
                          <SelectItem key={option} value={option.toString()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              name="interval.period"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Periode</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder=" " />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">
                          {transactionIntervalPeriodToLabel("days")}
                        </SelectItem>
                        <SelectItem value="weeks">
                          {transactionIntervalPeriodToLabel("weeks")}
                        </SelectItem>
                        <SelectItem value="months">
                          {transactionIntervalPeriodToLabel("months")}
                        </SelectItem>
                        <SelectItem value="years">
                          {transactionIntervalPeriodToLabel("years")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-4">
            <FormField
              name="interval.on"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neste uttak</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "flex gap-x-2 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Velg dato for uttak</span>
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
          </div>
        </div>
      ) : (
        <>
          <FormField
            name="on"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Neste uttak</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "flex gap-x-2 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Velg dato for uttak</span>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </>
  );
};
