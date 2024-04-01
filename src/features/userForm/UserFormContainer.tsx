import { Separator } from "@/components/ui/separator";
import { BaseForm } from "./BaseForm";
import { Header } from "./Header";
import { NewInvestmentButton } from "./NewInvestment/NewInvestmentButton";

export const UserFormContainer = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <Header />
        <Separator className="mt-2" />
      </div>
      <BaseForm />
      <div className="flex grow flex-col gap-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Sparing
        </h3>
        <NewInvestmentButton />
      </div>
    </div>
  );
};
