import { Fund } from "@/types";
import { interpolatedProjector } from "./projector";
import { SavingReturn, SavingReturnSample } from "./types";
import { getAvgMillisecondsForPeriod } from "./utils";

const STOCK_FUND_TAX = 0.3784 as const;
const SHIELDING_REDUCTION = 0.032 as const;

export const calclulateFundReturn = (
  fund: Fund,
  fundTax: number,
  shieldingReducton: number
): SavingReturn => {
  const { totalWithdrawn, balance, investedAmount } = fund;
  const profit = totalWithdrawn + balance - investedAmount;
  const profitPercentage = profit / investedAmount;
  const profitPercentageAfterShielding = profitPercentage - shieldingReducton;
  const tax =
    profitPercentageAfterShielding <= 0
      ? 0
      : profitPercentageAfterShielding * profit * fundTax;
  return { netProfit: profit - tax, tax };
};

export const projectFund = (
  fund: Fund,
  fromDate: Date,
  toDate: Date,
  numSamples: number
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
      STOCK_FUND_TAX,
      SHIELDING_REDUCTION
    );
    result.push({ time, netProfit, tax });
  }
  return result;
};
