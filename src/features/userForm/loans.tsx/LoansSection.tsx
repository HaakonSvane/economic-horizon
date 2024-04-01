import { NewItemButton } from "@/components/NewItemButton";
import { Button } from "@/components/ui/button";
import {
  DrawerDialog,
  DrawerDialogContent,
  DrawerDialogDescription,
  DrawerDialogHeader,
  DrawerDialogTitle,
  DrawerDialogTrigger,
} from "@/components/ui/drawerDialog";
import { useStore } from "@/lib/store";
import { CirclePlus, Trash } from "lucide-react";
import { useState } from "react";
import { LoanForm } from "./LoanForm";
import { LoanFormSchema } from "./types";

export const LoansSection = () => {
  const loans = useStore((state) => state.loans);
  const addLoanToStore = useStore((store) => store.addLoan);
  const [isAddingNewLoan, setIsAddingNewLoan] = useState<boolean>(false);

  const addLoan = (loanForm: LoanFormSchema) => {
    setIsAddingNewLoan(false);
    addLoanToStore({
      ...loanForm,
      termDate: loanForm.termDate.toISOString(),
    });
  };
  return (
    <DrawerDialog open={isAddingNewLoan} onOpenChange={setIsAddingNewLoan}>
      <div className="flex grow flex-col gap-y-2">
        <div className="flex flex-row justify-between">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Lån
          </h3>
          {loans.length > 0 && (
            <div>
              <DrawerDialogTrigger asChild>
                <Button>
                  <CirclePlus />
                </Button>
              </DrawerDialogTrigger>
              <Button>
                Slett alle
                <Trash />
              </Button>
            </div>
          )}
        </div>
        {loans.length === 0 && (
          <DrawerDialogTrigger asChild>
            <NewItemButton title="Legg til nytt lån" />
          </DrawerDialogTrigger>
        )}
        {loans.length > 0 && (
          <div className="grid grid-cols-2">her er noen fine ting :)</div>
        )}
      </div>
      <DrawerDialogContent>
        <DrawerDialogHeader>
          <DrawerDialogTitle>Nytt lån</DrawerDialogTitle>
          <DrawerDialogDescription>
            Fyll ut informasjonen på denne siden for å legge til et nytt lån.
          </DrawerDialogDescription>
        </DrawerDialogHeader>
        <LoanForm onValidSubmit={addLoan} />
      </DrawerDialogContent>
    </DrawerDialog>
  );
};
