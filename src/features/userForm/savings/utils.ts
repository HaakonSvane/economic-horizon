import { Saving } from "@/types";

export const savingContributionPeriodToLabel = (
  option: Saving["contributionPeriod"]["period"]
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
