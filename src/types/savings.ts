type SavingBase = {
  id: string;
  name: string;
  amount: number;
  investedAmount: number;
  ratePeriod: "yearly" | "monthly";
  monthlyContribution: number;
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
