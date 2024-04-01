type InvestmentBase = {
  id: string;
  name: string;
  amount: number;
  ratePeriod: "yearly" | "monthly";
  monthlyContribution: number;
};

export type Fund = InvestmentBase & {
  type: "fund";
  projectedInterestRate: number;
};

export type SavingsAccount = InvestmentBase & {
  type: "savingsAccount";
  interestRate: number;
};

export type Investment = Fund | SavingsAccount;
