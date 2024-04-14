import { CardSection } from "@/components/CardSection";
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
import {
  DrawerDialog,
  DrawerDialogContent,
  DrawerDialogDescription,
  DrawerDialogHeader,
  DrawerDialogTitle,
  DrawerDialogTrigger,
} from "@/components/ui/drawerDialog";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { LoanForm } from "./LoanForm";
import { LoansGrid } from "./LoansGrid";
import { LoanFormSchema } from "./types";

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
          <CardSection.Header>
            <CardSection.Title>Lån</CardSection.Title>
            {loans.length > 0 && (
              <div className="flex items-center gap-x-2">
                <DrawerDialogTrigger asChild>
                  <CardSection.AddButton />
                </DrawerDialogTrigger>
                <AlertDialogTrigger asChild>
                  <CardSection.ClearAllButton />
                </AlertDialogTrigger>
              </div>
            )}
          </CardSection.Header>

          {loans.length === 0 && (
            <DrawerDialogTrigger asChild>
              <CardSection.NewCardButton title="Legg til nytt lån" />
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
