import { Loan } from "@/types";
import { loanTypeToIcon, loanTypeToLabel } from "./utils";

export const LoanTypeDisplay = ({ type }: { type: Loan["type"] }) => {
  const Icon = loanTypeToIcon(type);
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 opacity-50" />
      {loanTypeToLabel(type)}
    </div>
  );
};
