import { Fund, SavingsAccount } from "@/types";
import { describe, expect, it } from "vitest";
import {
  calclulateFundReturn,
  calculateSavingsAccountReturn,
  projectFund,
} from "../savings";
import { addMonths, addYears } from "date-fns";

describe("calculateFundReturn", () => {
  it("should not tax if profit is negative", () => {
    const fund: Fund = {
      id: "123",
      type: "fund",
      name: "My test fund",
      projectedInterestRate: 0.1,
      ratePeriod: "monthly",
      investedAmount: 100,
      totalWithdrawn: 0,
      balance: 50,
      unusedShielding: 0,
    };

    const result = calclulateFundReturn(fund, 0.3);
    expect(result.tax).toBe(0);
    expect(result.netProfit).toBe(-50);
  });

  it("should tax if profit is positive", () => {
    const fund: Fund = {
      id: "123",
      type: "fund",
      name: "My test fund",
      projectedInterestRate: 0.1,
      ratePeriod: "monthly",
      investedAmount: 100,
      totalWithdrawn: 0,
      balance: 150,
      unusedShielding: 0,
    };

    const result = calclulateFundReturn(fund, 0.3);
    expect(result.tax).toBeGreaterThan(0);
  });

  it("should not tax if tax is zero", () => {
    const fund: Fund = {
      id: "123",
      type: "fund",
      name: "My test fund",
      projectedInterestRate: 0.1,
      ratePeriod: "monthly",
      investedAmount: 100,
      totalWithdrawn: 0,
      balance: 200,
      unusedShielding: 0,
    };

    const result = calclulateFundReturn(fund, 0);

    expect(result.tax).toBe(0);
    expect(result.netProfit).toBe(100);
  });

  // Disabled until shielding is implemented
  it.skip("should not tax if all profit is shielded", () => {
    const fund: Fund = {
      id: "123",
      type: "fund",
      name: "My test fund",
      projectedInterestRate: 0.1,
      ratePeriod: "monthly",
      investedAmount: 100,
      totalWithdrawn: 0,
      balance: 200,
      unusedShielding: 0,
    };

    const result = calclulateFundReturn(fund, 0.3);

    expect(result.tax).toBe(0);
    expect(result.netProfit).toBe(100);
  });
});

describe("projectFund", () => {
  it("should give gross returns (tax + net profit) according to projected interest rate", () => {
    const date = new Date(0);
    const aMonthAfter = addMonths(date, 1);
    const fund: Fund = {
      id: "123",
      type: "fund",
      name: "My test fund",
      projectedInterestRate: 0.1,
      ratePeriod: "monthly",
      investedAmount: 100,
      totalWithdrawn: 0,
      balance: 100,
      unusedShielding: 0,
    };

    const result = projectFund(fund, date, aMonthAfter, 10);
    const totalReturns =
      100 + (result.at(-1)?.netProfit ?? 0) + (result.at(-1)?.tax ?? 0);
    expect(result.length).toBe(10);
    expect(totalReturns).toBeCloseTo(110, 5);
  });

  it("should apply tax to the whole net profit and not incrementally build it", () => {
    const date = new Date(0);
    const aYearAfter = addYears(date, 1);

    const fund: Fund = {
      id: "123",
      type: "fund",
      name: "My test fund",
      projectedInterestRate: 0.1,
      ratePeriod: "monthly",
      investedAmount: 100,
      totalWithdrawn: 0,
      balance: 100,
      unusedShielding: 0,
    };
    const result = projectFund(fund, date, aYearAfter, 12, 0.5);
    expect(result.at(-1)?.tax).toBeCloseTo(106.921418836);
  });
});

describe("calculateSavingsAccountReturn", () => {
  it("Should not apply any tax", () => {
    const savingsAccount: SavingsAccount = {
      id: "123",
      type: "savingsAccount",
      name: "My test savings account",
      interestRate: 0.1,
      ratePeriod: "monthly",
      balance: 100,
      investedAmount: 100,
      totalWithdrawn: 0,
    };

    const result = calculateSavingsAccountReturn(savingsAccount);
    expect(result.tax).toBe(0);
  });
});
