import { Fund, Saving, Loan, SavingsAccount } from "@/types";

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
};

export type AddLoanPayload = Omit<Loan, "id">;
export type AddFundPayload = Omit<Fund, "id" | "type">;
export type AddSavingsAccountPayload = Omit<SavingsAccount, "id" | "type">;
