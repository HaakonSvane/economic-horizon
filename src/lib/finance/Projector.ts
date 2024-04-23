export type ProjectorInput = {
  numSamples: number;
  startDate: Date;
  endDate: Date;
  initialBalance: number;
  rate: number;
  ratePeriodTimeMillis: number;
};

export type ProjectorReturn = {
  time: Date;
  balance: number;
}[];

/**
 * Provides a list of `numSamples` projections of a balance over time with a smooth interpolation of the rate.
 * @param input A set of parameters to calculate the projection.
 * @returns A list of projections of the balance over time.
 */
export const interpolatedProjector = ({
  numSamples,
  startDate,
  endDate,
  initialBalance,
  rate,
  ratePeriodTimeMillis,
}: ProjectorInput): ProjectorReturn => {
  if (numSamples < 2) throw new Error("numSamples must be greater than 2");
  const result: ProjectorReturn = [];
  const timeStep = (endDate.getTime() - startDate.getTime()) / (numSamples - 1);

  let balance = initialBalance;
  let nextRatePeriodTime = startDate.getTime() + ratePeriodTimeMillis;

  for (let i = 0; i < numSamples; i++) {
    const currentTime = startDate.getTime() + i * timeStep;

    while (currentTime >= nextRatePeriodTime) {
      balance *= 1 + rate;
      nextRatePeriodTime += ratePeriodTimeMillis;
    }

    const elapsedTime =
      currentTime - (nextRatePeriodTime - ratePeriodTimeMillis);

    const interpolatedBalance =
      balance + (balance * rate * elapsedTime) / ratePeriodTimeMillis;

    result.push({ time: new Date(currentTime), balance: interpolatedBalance });
  }

  return result;
};

/**
 * Provides a list of `numSamples` projections of a balance over time with rate applied in steps according to `ratePeriodTimeMillis`.
 * @param input A set of parameters to calculate the projection.
 * @returns A list of projections of the balance over time.
 */
export const stepProjector = ({
  numSamples,
  startDate,
  endDate,
  initialBalance,
  rate,
  ratePeriodTimeMillis,
}: ProjectorInput) => {
  if (numSamples < 2) throw new Error("numSamples must be greater than 2");
  const result: ProjectorReturn = [];
  const timeStep = (endDate.getTime() - startDate.getTime()) / (numSamples - 1);

  for (let i = 0; i < numSamples; i++) {
    const ellapsedRateIterations = Math.floor(
      (timeStep * i) / ratePeriodTimeMillis
    );

    const elapsedMillis = timeStep * i;
    result.push({
      time: new Date(startDate.getTime() + elapsedMillis),
      balance: initialBalance * Math.pow(1 + rate, ellapsedRateIterations),
    });
  }

  return result;
};
