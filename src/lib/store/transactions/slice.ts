import { nanoid } from "nanoid";
import { StateCreator } from "zustand";
import { TransactionsSlice } from "./types";

export const createTransactionsSlice: StateCreator<TransactionsSlice> = (
  set,
  get
) => ({
  transactions: [],
  addTransaction: (transactionPayload) => {
    return set({
      transactions: [
        ...get().transactions,
        { ...transactionPayload, id: nanoid(4) },
      ],
    });
  },
  removeTransaction: (id) =>
    set({
      transactions: get().transactions.filter(
        (transaction) => transaction.id !== id
      ),
    }),
  clearAllTransactions: () => set({ transactions: [] }),
});
