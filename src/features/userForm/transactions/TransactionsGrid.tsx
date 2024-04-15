import { CardGrid } from "@/components/CardGrid";
import { useStore } from "@/lib/store";
import { TransactionCard } from "./TransactionCard";

export const TransactionsGrid = () => {
  const transactions = useStore((state) => state.transactions);
  <CardGrid>
    {transactions.map((transaction) => (
      <TransactionCard transaction={transaction} key={transaction.id} />
    ))}
  </CardGrid>;
};
