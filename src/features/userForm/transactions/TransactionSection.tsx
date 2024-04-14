import { CardSection } from "@/components/CardSection";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  DrawerDialog,
  DrawerDialogTrigger,
} from "@/components/ui/drawerDialog";
import { useStore } from "@/lib/store";
import { useState } from "react";

export const TransactionSection = () => {
  const transactions = useStore((state) => state.transactions);
  const [isAddingTransaction, setIsAddingTransaction] =
    useState<boolean>(false);
  return (
    <AlertDialog>
      <DrawerDialog
        open={isAddingTransaction}
        onOpenChange={setIsAddingTransaction}
      >
        <div className="flex grow flex-col gap-y-2">
          <CardSection.Header>
            <CardSection.Title>Innskudd / Uttak</CardSection.Title>
            {transactions.length > 0 && (
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

          {transactions.length === 0 && (
            <DrawerDialogTrigger asChild>
              <CardSection.NewCardButton title="Legg til nytt lån" />
            </DrawerDialogTrigger>
          )}
          {transactions.length > 0 && <LoansGrid />}
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
