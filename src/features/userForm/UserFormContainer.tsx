import { Separator } from "@/components/ui/separator";
import { BaseForm } from "./BaseForm";
import { Header } from "./Header";
import { SavingsSection } from "./savings/SavingsSection";
import { LoansSection } from "./loans.tsx/LoansSection";

export const UserFormContainer = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <Header />
        <Separator className="mt-2" />
      </div>
      <BaseForm />
      <LoansSection />
      <SavingsSection />
    </div>
  );
};
