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
  