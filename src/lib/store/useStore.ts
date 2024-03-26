import { create } from "zustand";
import { AddLoanPayload, Store } from "./types";
import { nanoid } from "nanoid";

export const useStore = create<Store>((set) => ({
    salary: 0,
    setSalary: (salary: number) => set({ salary }),

    loans: [],
    addLoan: (loan: AddLoanPayload) => set((state) => ({ loans: [...state.loans, {...loan, id: nanoid(4)}] })),
    removeLoan: (id: string) => set((state) => ({ loans: state.loans.filter((loan) => loan.id !== id) })),
}));