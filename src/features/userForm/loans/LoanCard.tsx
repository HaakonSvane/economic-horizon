import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loan } from "@/types";
import { loanTypeToIcon, loanTypeToLabel } from "./utils";

export type LoanCardProps = {
  loan: Loan;
};
export const LoanCard = ({ loan }: LoanCardProps) => {
  const Icon = loanTypeToIcon(loan.type);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center text-lg font-medium gap-4">
            <Icon className="opacity-50 size-10" />
            {loan.type === "other" ? loan.name : loanTypeToLabel(loan.type)}
          </div>
        </CardTitle>
        <CardDescription>Gjenstående {loan.amountLeft} kr</CardDescription>
      </CardHeader>
    </Card>
  );
};
