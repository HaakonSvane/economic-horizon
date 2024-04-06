type Contribution = {
  amound: number;
  every: number;
  period: "days" | "weeks" | "months" | "years";
  on: string;
};

type SavingBase = {
  id: string;
  name: string;
  balance: number;
  investedAmount: number;
  ratePeriod: "yearly" | "monthly";
  periodicContribution: number;
  contribution?: Contribution;
};

export type Fund = SavingBase & {
  type: "fund";
  projectedInterestRate: number;
};

export type SavingsAccount = SavingBase & {
  type: "savingsAccount";
  interestRate: number;
};

export type Saving = Fund | SavingsAccount;
