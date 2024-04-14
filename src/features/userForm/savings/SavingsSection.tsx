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
} from "@/components/ui/drawerDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { FundForm } from "./FundForm";
import { SavingsAccountForm } from "./SavingsAccountForm";
import { SavingsGrid } from "./SavingsGrid";
import { FundSchema, SavingsAccountSchema } from "./types";

export const SavingsSection = () => {
  const savings = useStore((state) => state.savings);
  const addFundToStore = useStore((store) => store.addFund);
  const addSavingsAccountToStore = useStore((store) => store.addSavingsAccount);
  const clearAllSavings = useStore((store) => store.clearAllSavings);
  const [isAddingNewFund, setIsAddingNewFund] = useState<boolean>(false);
  const [isAddingNewSavingsAccount, setIsAddingNewSavingsAccount] =
    useState<boolean>(false);

  const addFund = (fundForm: FundSchema) => {
    setIsAddingNewFund(false);
    addFundToStore(fundForm);
  };

  const addSavingsAccount = (savingsAccountForm: SavingsAccountSchema) => {
    setIsAddingNewSavingsAccount(false);
    addSavingsAccountToStore(savingsAccountForm);
  };

  return (
    <AlertDialog>
      <DrawerDialog open={isAddingNewFund} onOpenChange={setIsAddingNewFund}>
        <DrawerDialog
          open={isAddingNewSavingsAccount}
          onOpenChange={setIsAddingNewSavingsAccount}
        >
          <DropdownMenu>
            <div className="flex grow flex-col gap-y-2">
              <CardSection.Header>
                <CardSection.Title>Sparing</CardSection.Title>
                {savings.length > 0 && (
                  <div className="flex items-center gap-x-2">
                    <DropdownMenuTrigger asChild>
                      <CardSection.AddButton />
                    </DropdownMenuTrigger>

                    <AlertDialogTrigger asChild>
                      <CardSection.ClearAllButton />
                    </AlertDialogTrigger>
                  </div>
                )}
              </CardSection.Header>
              {savings.length === 0 && (
                <DropdownMenuTrigger asChild>
                  <CardSection.NewCardButton title="Legg til ny sparing" />
                </DropdownMenuTrigger>
              )}
              {savings.length > 0 && <SavingsGrid />}
            </div>

            <DropdownMenuContent>
              <DropdownMenuLabel>Type sparing</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsAddingNewSavingsAccount(true)}
              >
                Sparekonto
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsAddingNewFund(true)}>
                Fond
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DrawerDialogContent>
            <DrawerDialogHeader>
              <DrawerDialogTitle>Ny sparekonto</DrawerDialogTitle>
              <DrawerDialogDescription>
                Fyll ut informasjonen på denne siden for å legge til en ny
                sparekonto.
              </DrawerDialogDescription>
            </DrawerDialogHeader>
            <SavingsAccountForm onValidSubmit={addSavingsAccount} />
          </DrawerDialogContent>
        </DrawerDialog>
        <DrawerDialogContent>
          <DrawerDialogHeader>
            <DrawerDialogTitle>Nytt fond</DrawerDialogTitle>
            <DrawerDialogDescription>
              Fyll ut informasjonen på denne siden for å legge til et nytt fond.
            </DrawerDialogDescription>
          </DrawerDialogHeader>
          <FundForm onValidSubmit={addFund} />
        </DrawerDialogContent>
      </DrawerDialog>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Slette alle sparinger?</AlertDialogTitle>
          <AlertDialogDescription>
            Er du sikker på at du ønsker å slette alle sparingene dine? Denne
            operasjonen kan ikke angres.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Nei</AlertDialogCancel>
          <AlertDialogAction onClick={clearAllSavings}>Ja</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
