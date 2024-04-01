import { nanoid } from "nanoid";
import { create } from "zustand";
import { Store } from "./types";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      baseInfo: {
        salary: 0,
        taxes: 0,
      },
      setBaseInfo: (baseInfo) => set({ baseInfo }),

      investments: [],
      addFund: (fundPayload) =>
        set({
          investments: [
            ...get().investments,
            { ...fundPayload, id: nanoid(4), type: "fund" },
          ],
        }),

      addSavingsAccount: (savingsAccountPayload) =>
        set({
          investments: [
            ...get().investments,
            { ...savingsAccountPayload, id: nanoid(4), type: "savingsAccount" },
          ],
        }),

      removeInvestment: (id) =>
        set({
          investments: get().investments.filter(
            (investment) => investment.id !== id
          ),
        }),

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
    }),
    {
      name: "store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
