import { UseFormReturn, useWatch } from "react-hook-form";
import { usePeriodicValues } from "./usePeriodicValues";
import { EmptyFormFields, cn } from "@/lib/utils";
import { TransactionSchema } from "../types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { transactionIntervalPeriodToLabel } from "../utils";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useEffect } from "react";
import { useStore } from "@/lib/store";

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
      console.log("setting values");
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
