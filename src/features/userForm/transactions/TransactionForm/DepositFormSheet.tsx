import { EmptyFormFields } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { TransactionSchema } from "../types";
import { usePeriodicValues } from "./usePeriodicValues";

export type WithdrawalFormSheetProps = {
  form: UseFormReturn<
    EmptyFormFields<TransactionSchema>,
    unknown,
    TransactionSchema
  >;
};

export const DepositFormSheet = ({ form }: WithdrawalFormSheetProps) => {
  const { possibleEverys } = usePeriodicValues(form);
  return <></>;
};
