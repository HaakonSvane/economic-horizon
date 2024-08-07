type SavingBase = {
  id: string;
  name: string;
  totalWithdrawn: number;
  balance: number;
  investedAmount: number;
  ratePeriod: "yearly" | "monthly";
};

export type Fund = SavingBase & {
  type: "fund";
  projectedInterestRate: number;
  unusedShielding: number;
};

export type SavingsAccount = SavingBase & {
  type: "savingsAccount";
  interestRate: number;
};

export type Saving = Fund | SavingsAccount;

export const isFund = (saving: Saving): saving is Fund =>
  saving.type === "fund";
