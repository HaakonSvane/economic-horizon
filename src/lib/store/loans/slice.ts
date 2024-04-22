import { StateCreator } from "zustand";
import { LoansSlice } from "./types";
import { nanoid } from "nanoid";

export const createLoansSlice: StateCreator<LoansSlice> = (set, get) => ({
  loans: [],
  addLoan: (loanPayload) =>
    set({
      loans: [...get().loans, { ...loanPayload, id: nanoid(4) }],
    }),

  removeLoan: (id) =>
    set({
      loans: get().loans.filter((loan) => loan.id !== id),
    }),

  clearAllLoans: () => set({ loans: [] }),
});
