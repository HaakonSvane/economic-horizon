import { TransactionInterval } from "@/types";

export const transactionIntervalPeriodToLabel = (
  option: TransactionInterval["period"]
) => {
  switch (option) {
    case "days":
      return "Dag";
    case "weeks":
      return "Uke";
    case "months":
      return "Måned";
    case "years":
      return "År";
    default:
      return "Ukjent";
  }
};
