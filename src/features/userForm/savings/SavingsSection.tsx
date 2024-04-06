import { NewItemButton } from "@/components/NewItemButton";
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
import { Button } from "@/components/ui/button";
import {
  DrawerDialog,
  DrawerDialogContent,
  DrawerDialogDescription,
  DrawerDialogHeader,
  DrawerDialogTitle,
} from "@/components/ui/drawerDialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/lib/store";
import { CirclePlus, Trash } from "lucide-react";
import { useState } from "react";
import { FundSchema, SavingsAccountSchema } from "./types";
import { FundForm } from "./FundForm";

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
              <div className="flex flex-row justify-between">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Sparing
                </h3>
                {savings.length > 0 && (
                  <div className="flex items-center gap-x-2">
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <CirclePlus />
                      </Button>
                    </DropdownMenuTrigger>

                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex gap-x-2">
                        <Trash />
                        Slett alle
                      </Button>
                    </AlertDialogTrigger>
                  </div>
                )}
              </div>
              {savings.length === 0 && (
                <DropdownMenuTrigger asChild>
                  <NewItemButton title="Legg til ny sparing" />
                </DropdownMenuTrigger>
              )}
              {/* {savings.length > 0 && <LoansGrid />} */}
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
            {/* <LoanForm onValidSubmit={addFund} /> */}
          </DrawerDialogContent>
        </DrawerDialog>
        <DrawerDialogContent>
          <DrawerDialogHeader>
            <DrawerDialogTitle>Nytt fond</DrawerDialogTitle>
            <DrawerDialogDescription>
              Fyll ut informasjonen på denne siden for å legge til et nytt fond.
            </DrawerDialogDescription>
          </DrawerDialogHeader>
          <FundForm onValidSubmit={() => null} />
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
