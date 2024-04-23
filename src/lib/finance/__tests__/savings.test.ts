import { Fund } from "@/types";
import { describe, expect, it } from "vitest";
import { calclulateFundReturn, projectFund } from "../savings";
import { addMonths } from "date-fns";

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
    };

    const result = calclulateFundReturn(fund, 0.3, 0.02);

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
    };

    const result = calclulateFundReturn(fund, 0.3, 0.02);

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
    };

    const result = calclulateFundReturn(fund, 0, 0.02);

    expect(result.tax).toBe(0);
    expect(result.netProfit).toBe(100);
  });

  it("should not tax if all profit is shielded", () => {
    const fund: Fund = {
      id: "123",
      type: "fund",
      name: "My test fund",
      projectedInterestRate: 0.1,
      ratePeriod: "monthly",
      investedAmount: 100,
      totalWithdrawn: 0,
      balance: 200,
    };

    const result = calclulateFundReturn(fund, 0.3, 1);

    expect(result.tax).toBe(0);
    expect(result.netProfit).toBe(100);
  });
});

describe("projectFund", () => {
  it("should give total returns (tax + net profit) according to projected interest rate", () => {
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
    };

    const result = projectFund(fund, date, aMonthAfter, 10);
    const totalReturns =
      100 + (result.at(-1)?.netProfit ?? 0) + (result.at(-1)?.tax ?? 0);
    expect(result.length).toBe(10);
    expect(totalReturns).toBeCloseTo(110, 5);
  });
});
