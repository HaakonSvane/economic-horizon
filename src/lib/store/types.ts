import { Loan } from "@/types";

export type Store = {
    salary: number;
    loans: Loan[];
}

export type AddLoanPayload = Omit<Loan, "id">;