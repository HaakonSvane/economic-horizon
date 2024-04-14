import { Deposit } from "@/types/deposit";

export const depositIntervalPeriodToLabel = (
  option: NonNullable<Deposit["interval"]>["period"]
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
