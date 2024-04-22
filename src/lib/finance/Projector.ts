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

export const projector = ({
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
