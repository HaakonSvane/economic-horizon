import { createAppSelector } from "@/lib/utils";

export const test = createAppSelector(
  [
    (state) => state.loans,
    (state) => state.savings,
    (state) => state.transactions,
  ],
  (loans, savings, transactions) =>
    loans.length + savings.length + transactions.length
);
