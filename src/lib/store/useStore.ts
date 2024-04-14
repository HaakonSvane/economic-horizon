import { nanoid } from "nanoid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Store } from "./types";

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      baseInfo: null,
      setBaseInfo: (baseInfo) => set({ baseInfo }),

      savings: [],
      addFund: (fundPayload) =>
        set({
          savings: [
            ...get().savings,
            { ...fundPayload, id: nanoid(4), type: "fund" },
          ],
        }),

      addSavingsAccount: (savingsAccountPayload) =>
        set({
          savings: [
            ...get().savings,
            { ...savingsAccountPayload, id: nanoid(4), type: "savingsAccount" },
          ],
        }),

      removeSaving: (id) =>
        set({
          savings: get().savings.filter((investment) => investment.id !== id),
        }),
      clearAllSavings: () => set({ savings: [] }),

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

      transactions: [],
      addTransaction: (transactionPayload) =>
        set({
          transactions: [
            ...get().transactions,
            { ...transactionPayload, id: nanoid(4) },
          ],
        }),
      removeTransaction: (id) =>
        set({
          transactions: get().transactions.filter(
            (transaction) => transaction.id !== id
          ),
        }),
      clearAllTransactions: () => set({ transactions: [] }),
    }),
    {
      name: "store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
