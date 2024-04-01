import { Fund, Investment, Loan, SavingsAccount } from "@/types";

type BaseInfo = {
  salary: number;
  taxes: number;
};

export type Store = {
  baseInfo: BaseInfo;
  setBaseInfo: (baseInfo: BaseInfo) => void;

  loans: Loan[];
  addLoan: (loan: AddLoanPayload) => void;
  removeLoan: (id: string) => void;

  investments: Investment[];
  addFund: (fund: AddFundPayload) => void;
  addSavingsAccount: (savingsAccount: AddSavingsAccountPayload) => void;
  removeInvestment: (id: string) => void;
};

export type AddLoanPayload = Omit<Loan, "id">;
export type AddFundPayload = Omit<Fund, "id" | "type">;
export type AddSavingsAccountPayload = Omit<SavingsAccount, "id" | "type">;
