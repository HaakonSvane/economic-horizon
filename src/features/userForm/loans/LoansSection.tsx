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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoansGrid } from "./LoansGrid";

export const LoansSection = () => {
  const loans = useStore((state) => state.loans);
  const addLoanToStore = useStore((store) => store.addLoan);
  const clearAllLoans = useStore((store) => store.clearAllLoans);
  const [isAddingNewLoan, setIsAddingNewLoan] = useState<boolean>(false);

  const addLoan = (loanForm: LoanFormSchema) => {
    setIsAddingNewLoan(false);
    addLoanToStore({
      ...loanForm,
      termDate: loanForm.termDate.toISOString(),
    });
  };

  return (
    <AlertDialog>
      <DrawerDialog open={isAddingNewLoan} onOpenChange={setIsAddingNewLoan}>
        <div className="flex grow flex-col gap-y-2">
          <div className="flex flex-row justify-between">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Lån
            </h3>
            {loans.length > 0 && (
              <div className="flex items-center gap-x-2">
                <DrawerDialogTrigger asChild>
                  <Button variant="outline">
                    <CirclePlus />
                  </Button>
                </DrawerDialogTrigger>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex gap-x-2">
                    <Trash />
                    Slett alle
                  </Button>
                </AlertDialogTrigger>
              </div>
            )}
          </div>
          {loans.length === 0 && (
            <DrawerDialogTrigger asChild>
              <NewItemButton title="Legg til nytt lån" />
            </DrawerDialogTrigger>
          )}
          {loans.length > 0 && <LoansGrid />}
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

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Slette alle lån?</AlertDialogTitle>
          <AlertDialogDescription>
            Er du sikker på at du ønsker å slette alle lånene dine? Denne
            operasjonen kan ikke angres.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Nei</AlertDialogCancel>
          <AlertDialogAction onClick={clearAllLoans}>Ja</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
