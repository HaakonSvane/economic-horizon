import { useStore } from "@/lib/store";
import { LoanCard } from "./LoanCard";

export const LoansGrid = () => {
  const loans = useStore((state) => state.loans);
  return (
    <div className="grid grid-cols-2 gap-2">
      {loans.map((loan) => (
        <LoanCard loan={loan} key={loan.id} />
      ))}
    </div>
  );
};
