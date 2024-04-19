import { BaseForm } from "./BaseForm";
import { LoansSection } from "./loans/LoansSection";
import { SavingsSection } from "./savings/SavingsSection";
import { TransactionsSection } from "./transactions/TransactionsSection";

export const UserFormContainer = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <BaseForm />
      <LoansSection />
      <SavingsSection />
      <TransactionsSection />
    </div>
  );
};
