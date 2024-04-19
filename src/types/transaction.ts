import { Either } from "./utils";

type BaseTransaction = {
  id: string;
  name: string;
  amount: number;
};

export type TransactionInterval = {
  every: number;
  period: "days" | "weeks" | "months" | "years";
  on: string;
};

type TransactionFrequency =
  | {
      paymentFrequency: "recurring";
      interval: TransactionInterval;
    }
  | {
      paymentFrequency: "once";
      on: string;
    };

export type Withdrawal = BaseTransaction &
  TransactionFrequency & {
    type: "withdrawal";
    savingsId: string;
  };

export type Deposit = BaseTransaction &
  TransactionFrequency & {
    type: "deposit";
  } & Either<{ savingsId: string }, { loanId: string }>;

export type Transaction = Withdrawal | Deposit;
