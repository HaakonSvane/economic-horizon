import { useStore } from "@/lib/store";
import { AddFundPayload } from "@/lib/store/types";
import { act, render, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TransactionsSection } from "../TransactionsSection";

describe("TransactionSection", () => {
  it("should be disabled when there are no loans or savings", () => {
    const { getByRole } = render(<TransactionsSection />);
    const button = getByRole("button") as HTMLButtonElement;

    const { result: clearLoansResult } = renderHook(useStore, {
      initialProps: (state) => state.clearAllLoans,
    });

    const { result: clearSavingsResult } = renderHook(useStore, {
      initialProps: (state) => state.clearAllSavings,
    });

    act(() => (clearLoansResult.current as () => void)());
    act(() => (clearSavingsResult.current as () => void)());

    expect(button.disabled).toBeTruthy();
  });

  it("should be enabled when there are loans or savings", () => {
    const { getByRole } = render(<TransactionsSection />);
    const button = getByRole("button") as HTMLButtonElement;

    const savingsPayload: AddFundPayload = {
      name: "test savings",
      balance: 1000,
      investedAmount: 500,
      ratePeriod: "yearly",
      projectedInterestRate: 2.3,
    };

    const { result: addSavingsHook } = renderHook(useStore, {
      initialProps: (state) => state.addFund,
    });

    act(() =>
      (addSavingsHook.current as (payload: AddFundPayload) => void)(
        savingsPayload
      )
    );

    expect(button.disabled).toBeFalsy();
  });
});
