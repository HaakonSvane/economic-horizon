import { describe, expect, it } from "vitest";
import { interpolatedProjector, stepProjector } from "../projector";

describe.each([
  { projector: interpolatedProjector },
  { projector: stepProjector },
])("projector $projector.name", ({ projector }) => {
  it.each([
    [0.1, 1, 1.1],
    [1, 1, 2],
    [-1, 1, 0],
  ])(
    "should result in array with initial and final expected values",
    (rate, initial, final) => {
      const date = new Date(0);
      const dayMillis = 1000 * 60 * 60 * 24;
      const dayAfter = new Date(dayMillis);

      const result = projector({
        numSamples: 2,
        startDate: date,
        endDate: dayAfter,
        initialBalance: initial,
        rate,
        ratePeriodTimeMillis: dayMillis,
      });
      expect(result.at(0)?.balance).toEqual(initial);
      expect(result.at(-1)?.balance).toEqual(final);
    }
  );
  it.each([
    [1, (1000 * 60 * 60 * 24) / 1, 2],
    [0.5, (1000 * 60 * 60 * 24) / 2, 2.25],
    [0.25, (1000 * 60 * 60 * 24) / 4, 2.44140625],
  ])(
    "should apply rate such that last sample is close to expected value",
    (rate, ratePeriodTimeMillis, expected) => {
      const date = new Date(0);
      const dayMillis = 1000 * 60 * 60 * 24;
      const dayAfter = new Date(dayMillis);

      const result = projector({
        numSamples: 2,
        startDate: date,
        endDate: dayAfter,
        initialBalance: 1,
        rate,
        ratePeriodTimeMillis,
      });
      expect(result.at(-1)?.balance).toBeCloseTo(expected);
    }
  );
  it("should end up at same end results no matter the number of samples", () => {
    const date = new Date(0);
    const dayMillis = 1000 * 60 * 60 * 24;
    const dayAfter = new Date(dayMillis);

    const coarseResult = projector({
      numSamples: 2,
      startDate: date,
      endDate: dayAfter,
      initialBalance: 1,
      rate: 0.25,
      ratePeriodTimeMillis: dayMillis / 4,
    });

    const fineResult = projector({
      numSamples: 20,
      startDate: date,
      endDate: dayAfter,
      initialBalance: 1,
      rate: 0.25,
      ratePeriodTimeMillis: dayMillis / 4,
    });

    expect(coarseResult.at(0)?.balance).toEqual(fineResult.at(0)?.balance);
    expect(coarseResult.at(-1)?.balance).toEqual(fineResult.at(-1)?.balance);
  });
});

describe("interpolatedProjector", () => {
  it("should have even change of balance over samples", () => {
    const date = new Date(0);
    const dayMillis = 1000 * 60 * 60 * 24;
    const dayAfter = new Date(dayMillis);

    const result = interpolatedProjector({
      numSamples: 10,
      startDate: date,
      endDate: dayAfter,
      initialBalance: 1,
      rate: 0.25,
      ratePeriodTimeMillis: dayMillis,
    });

    const balanceChanges = result
      .map((item, index, array) => {
        if (index === 0) {
          return 0;
        }
        return item.balance - array[index - 1].balance;
      })
      .slice(1);

    const mean =
      balanceChanges.reduce((sum, balance) => sum + balance, 0) /
      balanceChanges.length;
    const squaredDifferences = balanceChanges.map((balance) =>
      Math.pow(balance - mean, 2)
    );
    const variance =
      squaredDifferences.reduce(
        (sum, squaredDifference) => sum + squaredDifference,
        0
      ) / balanceChanges.length;
    const standardDeviation = Math.sqrt(variance);
    expect(standardDeviation).toBeCloseTo(0, 10);
  });
});
