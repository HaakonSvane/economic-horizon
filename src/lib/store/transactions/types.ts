import { Transaction } from "@/types";
import { ProperOmit } from "@/types/utils";

export type AddTransactionPayload = ProperOmit<Transaction, "id">;

export type TransactionsSlice = {
  transactions: Transaction[];
  addTransaction: (transaction: AddTransactionPayload) => void;
  removeTransaction: (id: string) => void;
  clearAllTransactions: () => void;
};
