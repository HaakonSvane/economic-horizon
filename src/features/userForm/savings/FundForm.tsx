import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DrawerDialogClose,
  DrawerDialogFooter,
} from "@/components/ui/drawerDialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { EmptyFormFields, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { fundSchema } from "./schemas/fundSchema";
import { FundSchema } from "./types";
import { savingContributionPeriodToLabel } from "./utils";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/CurrencyInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PercentageInput } from "@/components/PercentageInput";

export type FundFormProps = {
  onValidSubmit: (data: FundSchema) => void;
};

export const FundForm = ({ onValidSubmit }: FundFormProps) => {
  const form = useForm<EmptyFormFields<FundSchema>, unknown, FundSchema>({
    resolver: zodResolver(fundSchema),
    defaultValues: {
      name: "",
      balance: "",
      investedAmount: "",
      ratePeriod: "",
      contributionPeriod: {
        every: 1,
        period: "days",
        on: null,
      },
      projectedInterestRate: "",
    },
  });

  const selectedPeriod = useWatch({
    name: "contributionPeriod.period",
    control: form.control,
  });

  const [hasPeriodicContribution, setHasPeriodicContribution] =
    useState<boolean>(false);

  useEffect(() => {
    form.resetField("contributionPeriod");
    if (!hasPeriodicContribution) {
      return form.setValue("contributionPeriod", null);
    }
  }, [hasPeriodicContribution]);

  useEffect(() => {
    const currentEvery = form.getValues("contributionPeriod.every");
    if (typeof currentEvery !== "number") return;
    form.setValue(
      "contributionPeriod.every",
      Math.min(possibleEverys.at(-1) ?? currentEvery, currentEvery)
    );
  }, [selectedPeriod]);

  const possibleEverys = useMemo(() => {
    let maxEvery = 0;
    switch (selectedPeriod) {
      case "days":
        maxEvery = 6;
        break;
      case "weeks":
        maxEvery = 4;
        break;
      case "months":
        maxEvery = 11;
        break;
      case "years":
        maxEvery = 3;
        break;
    }
    return Array.from(Array(maxEvery).keys()).map((i) => i + 1);
  }, [selectedPeriod]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="grid grid-cols-1 gap-y-6"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <Input placeholder="Navn på fond..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="balance"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beholdning</FormLabel>
              <FormControl>
                <CurrencyInput
                  placeholder="Penger på fondet i dag..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="investedAmount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Totalt investert</FormLabel>
              <FormControl>
                <CurrencyInput
                  placeholder="Penger investert totalt..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-x-2 items-center">
          <FormField
            name="projectedInterestRate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Forventet rente</FormLabel>
                <FormControl>
                  <PercentageInput
                    placeholder="Forventet avkastning i prosent..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid h-full">
            <FormField
              name="ratePeriod"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terminperiode</FormLabel>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex grow flex-row space-x-1 justify-evenly"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="monthly" />
                      </FormControl>
                      <FormLabel className="font-normal">Månedlig</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yearly" />
                      </FormControl>
                      <FormLabel className="font-normal">Årlig</FormLabel>
                    </FormItem>
                  </RadioGroup>
                  <FormDescription>
                    Perioden renten gir avkastning på
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <Switch
            id="periodicContribution"
            checked={hasPeriodicContribution}
            onCheckedChange={setHasPeriodicContribution}
          />
          <Label htmlFor="periodicContribution">Periodisk innskudd</Label>
        </div>

        <div className="grid grid-cols-6 gap-x-2">
          <FormField
            name="contributionPeriod.every"
            control={form.control}
            disabled={!hasPeriodicContribution}
            render={({ field }) => (
              <FormItem className="grid col-span-1">
                <FormLabel>Hver</FormLabel>
                <FormControl>
                  <Select
                    disabled={!hasPeriodicContribution}
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value.toString()}
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
          <FormField
            name="contributionPeriod.period"
            control={form.control}
            disabled={!hasPeriodicContribution}
            render={({ field }) => (
              <FormItem className="grid col-span-2">
                <FormLabel>Periode</FormLabel>
                <FormControl>
                  <Select
                    disabled={!hasPeriodicContribution}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder=" " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">
                        {savingContributionPeriodToLabel("days")}
                      </SelectItem>
                      <SelectItem value="weeks">
                        {savingContributionPeriodToLabel("weeks")}
                      </SelectItem>
                      <SelectItem value="months">
                        {savingContributionPeriodToLabel("months")}
                      </SelectItem>
                      <SelectItem value="years">
                        {savingContributionPeriodToLabel("years")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="contributionPeriod.on"
            control={form.control}
            disabled={!hasPeriodicContribution}
            render={({ field }) => (
              <FormItem className="grid col-span-3">
                <FormLabel>Neste innskudd</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={!hasPeriodicContribution}
                        variant="outline"
                        className={cn(
                          "flex gap-x-2 text-left font-normal",
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
        </div>

        <DrawerDialogFooter>
          <DrawerDialogClose asChild>
            <Button variant="outline">Lukk</Button>
          </DrawerDialogClose>
          <Button type="submit">Legg til fond</Button>
        </DrawerDialogFooter>
      </form>
    </Form>
  );
};
