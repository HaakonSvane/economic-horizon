import { describe, expect, it } from "vitest";
import { projector } from "../projector";

describe("projector", () => {
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
    "should apply rate according to rate period and number of samples",
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
