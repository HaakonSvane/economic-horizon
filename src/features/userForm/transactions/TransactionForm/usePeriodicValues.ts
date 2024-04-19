import { EmptyFormFields } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { TransactionSchema } from "../types";

export const usePeriodicValues = (
  form: UseFormReturn<
    EmptyFormFields<TransactionSchema>,
    unknown,
    TransactionSchema
  >
) => {
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
  return { possibleEverys };
};
