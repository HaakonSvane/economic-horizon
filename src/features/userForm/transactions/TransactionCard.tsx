import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types";

type TransactionCardProps = {
  transaction: Transaction;
};
export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center text-lg font-medium gap-4">
            <Icon className="opacity-50 size-10" />
            {transaction.type === "other"
              ? transaction.name
              : loanTypeToLabel(loan.type)}
          </div>
        </CardTitle>
        <CardDescription>Gjenstående {loan.amountLeft} kr</CardDescription>
      </CardHeader>
    </Card>
  );
};
