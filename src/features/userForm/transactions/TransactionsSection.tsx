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
import { TransactionsGrid } from "./TransactionsGrid";
import { TransactionForm } from "./TransactionForm/TransactionForm";
import { TransactionSchema } from "./types";

export const TransactionsSection = () => {
  const savings = useStore((state) => state.savings);
  const loans = useStore((state) => state.loans);
  const transactions = useStore((state) => state.transactions);
  const addTransactionToStore = useStore((store) => store.addTransaction);
  const clearAllTransactions = useStore((store) => store.clearAllTransactions);

  const [isAddingTransaction, setIsAddingTransaction] =
    useState<boolean>(false);

  const addTransaction = (transactionForm: TransactionSchema) => {
    addTransactionToStore(transactionForm);
  };

  return (
    <AlertDialog>
      <DrawerDialog
        open={isAddingTransaction}
        onOpenChange={setIsAddingTransaction}
      >
        <div className="flex grow flex-col gap-y-2">
          <CardSection.Header>
            <CardSection.Title>Innskudd & Uttak</CardSection.Title>
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
              <CardSection.NewCardButton
                disabled={savings.length === 0 && loans.length === 0}
                title="Legg til nytt innskudd eller uttak"
              />
            </DrawerDialogTrigger>
          )}
          {transactions.length > 0 && <TransactionsGrid />}
        </div>

        <DrawerDialogContent>
          <DrawerDialogHeader>
            <DrawerDialogTitle>Nytt uttak / innskudd</DrawerDialogTitle>
            <DrawerDialogDescription>
              Fyll ut informasjonen på denne siden for å legge til et nytt uttak
              / innskudd.
            </DrawerDialogDescription>
          </DrawerDialogHeader>
          <TransactionForm onValidSubmit={addTransaction} />
        </DrawerDialogContent>
      </DrawerDialog>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Slette alle innskudd og uttak?</AlertDialogTitle>
          <AlertDialogDescription>
            Er du sikker på at du ønsker å slette alle inskuddene og uttakene
            dine? Denne operasjonen kan ikke angres.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Nei</AlertDialogCancel>
          <AlertDialogAction onClick={clearAllTransactions}>
            Ja
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
