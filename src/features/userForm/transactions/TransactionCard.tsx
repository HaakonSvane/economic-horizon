import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

type TransactionCardProps = {
  transaction: Transaction;
};
export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const Icon = transaction.type === "withdrawal" ? ArrowBigDown : ArrowBigUp;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center text-lg font-medium gap-4">
            <Icon
              className={cn(
                "size-10",
                transaction.type === "deposit"
                  ? "text-green-300"
                  : "text-red-300"
              )}
            />
            {transaction.type === "deposit" ? "Innskudd" : "Uttak"}
          </div>
        </CardTitle>
        <CardDescription>{`${transaction.name}\n${transaction.type === "deposit" ? "+" : "-"} kr ${transaction.amount}`}</CardDescription>
      </CardHeader>
    </Card>
  );
};
