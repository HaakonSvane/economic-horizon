import { Saving } from "@/types";
import { CircleHelp, Landmark, LineChart } from "lucide-react";

export const savingsTypeToLabel = (type: Saving["type"]) => {
  switch (type) {
    case "fund":
      return "Fond";
    case "savingsAccount":
      return "Sparekonto";
    default:
      return "Ukjent sparetype";
  }
};

export const savingsTypeToIcon = (type: Saving["type"]) => {
  switch (type) {
    case "fund":
      return LineChart;
    case "savingsAccount":
      return Landmark;
    default:
      return CircleHelp;
  }
};
