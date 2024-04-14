import { Transaction } from "@/types";

export const transactionIntervalPeriodToLabel = (
  option: NonNullable<Transaction["interval"]>["period"]
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
