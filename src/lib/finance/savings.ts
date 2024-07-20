import { Fund, SavingsAccount } from "@/types";
import { interpolatedProjector, stepProjector } from "./projector";
import { FundReturn, SavingReturn, SavingReturnSample } from "./types";
import { getAvgMillisecondsForPeriod } from "./utils";

const STOCK_FUND_TAX = 0.3784 as const;
// const SHIELDING_REDUCTION = 0.032 as const;

export const calclulateFundReturn = (
  fund: Fund,
  fundTax: number
  // shieldingReducton: number
): FundReturn => {
  const { totalWithdrawn, balance, investedAmount, unusedShielding } = fund;
  const profit = totalWithdrawn + balance - investedAmount;
  const tax = profit <= 0 ? 0 : profit * fundTax;
  return { netProfit: profit - tax, tax, screeningBasis: unusedShielding };
};

export const projectFund = (
  fund: Fund,
  fromDate: Date,
  toDate: Date,
  numSamples: number,
  stockFundTax: number = STOCK_FUND_TAX
): SavingReturnSample[] => {
  const millisInPeriod = getAvgMillisecondsForPeriod(
    fromDate,
    toDate,
    fund.ratePeriod
  );

  const projectedGrowth = interpolatedProjector({
    numSamples,
    startDate: fromDate,
    endDate: toDate,
    initialBalance: fund.balance,
    rate: fund.projectedInterestRate,
    ratePeriodTimeMillis: millisInPeriod,
  });
  const result: SavingReturnSample[] = [];
  for (const keyFrame of projectedGrowth) {
    const { time, balance } = keyFrame;
    const { netProfit, tax } = calclulateFundReturn(
      { ...fund, balance },
      stockFundTax
    );
    result.push({ time, netProfit, tax });
  }
  return result;
};

export const calculateSavingsAccountReturn = (
  savingsAccount: SavingsAccount
): SavingReturn => {
  const { investedAmount, totalWithdrawn, balance } = savingsAccount;
  const profit = balance + totalWithdrawn - investedAmount;
  return { netProfit: profit, tax: 0 };
};

export const projectSavingsAccount = (
  savingsAccount: SavingsAccount,
  fromDate: Date,
  toDate: Date,
  numSamples: number
): SavingReturnSample[] => {
  const millisInPeriod = getAvgMillisecondsForPeriod(
    fromDate,
    toDate,
    savingsAccount.ratePeriod
  );
  const initialBalance = savingsAccount.balance;

  const projectedGrowth = stepProjector({
    numSamples,
    startDate: fromDate,
    endDate: toDate,
    initialBalance,
    rate: savingsAccount.interestRate,
    ratePeriodTimeMillis: millisInPeriod,
  });
  const result: SavingReturnSample[] = [];
  for (const keyFrame of projectedGrowth) {
    const { time, balance } = keyFrame;
    result.push({ time, netProfit: balance - initialBalance, tax: 0 });
  }
  return result;
};
