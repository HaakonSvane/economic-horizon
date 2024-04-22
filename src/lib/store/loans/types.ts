import { Loan } from "@/types";
import { ProperOmit } from "@/types/utils";

export type AddLoanPayload = ProperOmit<Loan, "id">;

export type LoansSlice = {
  loans: Loan[];
  addLoan: (loan: AddLoanPayload) => void;
  removeLoan: (id: string) => void;
  clearAllLoans: () => void;
};
