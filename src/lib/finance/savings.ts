import { Fund } from "@/types";
import { interpolatedProjector } from "./projector";
import { FundReturn, SavingReturnSample } from "./types";
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
