import { NullableEither } from "./utils";

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
    accountId: {
      savingsId: string;
    };
    savingsId: string;
  };

export type Deposit = BaseTransaction &
  TransactionFrequency & {
    type: "deposit";
    accountId: NullableEither<{ savingsId: string }, { loanId: string }>;
  };

export type Transaction = Withdrawal | Deposit;
