import { Loan } from "@/types";
import { Car, CircleHelp, Ellipsis, Home, School } from "lucide-react";

export const loanTypeToLabel = (type: Loan["type"]) => {
  switch (type) {
    case "car":
      return "Billån";
    case "house":
      return "Boliglån";
    case "student":
      return "Studielån";
    case "other":
      return "Annet";
    default:
      return "Ukjent lån";
  }
};

export const loanTypeToIcon = (type: Loan["type"]) => {
  switch (type) {
    case "car":
      return Car;
    case "house":
      return Home;
    case "student":
      return School;
    case "other":
      return Ellipsis;
    default:
      return CircleHelp;
  }
};

export const loanPaymentOptionToLabel = (option: Loan["paymentPlanOption"]) => {
  switch (option) {
    case "annuity":
      return "Annuitetslån";
    case "series":
      return "Serielån";
    default:
      return "Ukjent";
  }
};
