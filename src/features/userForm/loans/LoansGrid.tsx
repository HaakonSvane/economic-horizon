import { useStore } from "@/lib/store";
import { LoanCard } from "./LoanCard";
import { CardGrid } from "@/components/CardGrid";

export const LoansGrid = () => {
  const loans = useStore((state) => state.loans);
  return (
    <CardGrid>
      {loans.map((loan) => (
        <LoanCard loan={loan} key={loan.id} />
      ))}
    </CardGrid>
  );
};
