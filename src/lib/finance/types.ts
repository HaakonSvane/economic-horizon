export type SavingReturn = {
  netProfit: number;
  tax: number;
};

export type FundReturn = {
  netProfit: number;
  tax: number;
  screeningBasis: number;
};

export type SavingReturnSample = SavingReturn & {
  time: Date;
};
