import { EmptyFormFields, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { depositSchema } from "./depositSchema";
import { DepositSchema } from "./types";
import { useEffect, useMemo, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { depositIntervalPeriodToLabel } from "./utils";
import {
  DrawerDialogClose,
  DrawerDialogFooter,
} from "@/components/ui/drawerDialog";

export type DepositFormProps = {
  onValidSubmit: (data: DepositSchema) => void;
};

export const DepositForm = ({ onValidSubmit }: DepositFormProps) => {
  const form = useForm<EmptyFormFields<DepositSchema>, unknown, DepositSchema>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      name: "",
      amount: "",
      interval: null,
    },
  });

  const selectedPeriod = useWatch({
    name: "interval.period",
    control: form.control,
  });

  useEffect(() => {
    const currentEvery = form.getValues("interval.every");
    if (typeof currentEvery !== "number") return;
    form.setValue(
      "interval.every",
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

  const [hasPeriodicContribution, setHasPeriodicContribution] =
    useState<boolean>(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)}>
        <Collapsible
          open={hasPeriodicContribution}
          className="flex flex-col gap-y-4"
        >
          <div className="flex items-center gap-x-2">
            <Switch
              id="periodicContribution"
              checked={hasPeriodicContribution}
              onCheckedChange={setHasPeriodicContribution}
            />
            <Label htmlFor="periodicContribution">
              Jeg setter inn penger periodisk
            </Label>
          </div>
          <CollapsibleContent className="grid grid-cols-6 gap-x-2">
            <FormField
              name="interval.every"
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
              name="interval.period"
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
                          {depositIntervalPeriodToLabel("days")}
                        </SelectItem>
                        <SelectItem value="weeks">
                          {depositIntervalPeriodToLabel("weeks")}
                        </SelectItem>
                        <SelectItem value="months">
                          {depositIntervalPeriodToLabel("months")}
                        </SelectItem>
                        <SelectItem value="years">
                          {depositIntervalPeriodToLabel("years")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="interval.on"
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
          </CollapsibleContent>
        </Collapsible>

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
