import { Fund, Saving, Loan, SavingsAccount } from "@/types";
import { Transaction } from "@/types";
import { ProperOmit } from "@/types/utils";

type BaseInfo = {
  salary: number;
  taxes: number;
};

export type Store = {
  baseInfo: BaseInfo | null;
  setBaseInfo: (baseInfo: BaseInfo) => void;

  loans: Loan[];
  addLoan: (loan: AddLoanPayload) => void;
  removeLoan: (id: string) => void;
  clearAllLoans: () => void;

  savings: Saving[];
  addFund: (fund: AddFundPayload) => void;
  addSavingsAccount: (savingsAccount: AddSavingsAccountPayload) => void;
  removeSaving: (id: string) => void;
  clearAllSavings: () => void;

  transactions: Transaction[];
  addTransaction: (transaction: AddTransactionPayload) => void;
  removeTransaction: (id: string) => void;
  clearAllTransactions: () => void;
};

export type AddLoanPayload = ProperOmit<Loan, "id">;
export type AddFundPayload = ProperOmit<Fund, "id" | "type">;
export type AddSavingsAccountPayload = ProperOmit<
  SavingsAccount,
  "id" | "type"
>;
export type AddTransactionPayload = ProperOmit<Transaction, "id">;
