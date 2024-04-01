import { Loan } from "@/types";
import { Car, Ellipsis, Home, School } from "lucide-react";

export const LoanTypeDisplay = ({ type }: { type: Loan["type"] }) => {
  switch (type) {
    case "car":
      return (
        <div className="flex items-center gap-2">
          <Car className="size-4 opacity-50" />
          Billån
        </div>
      );
    case "house":
      return (
        <div className="flex items-center gap-2">
          <Home className="size-4 opacity-50" />
          Huslån
        </div>
      );
    case "student":
      return (
        <div className="flex items-center gap-2">
          <School className="size-4 opacity-50" />
          Studielån
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-2">
          <Ellipsis className="size-4 opacity-50" />
          Annet
        </div>
      );
  }
};
