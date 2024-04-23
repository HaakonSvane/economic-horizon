export type SavingReturn = {
  netProfit: number;
  tax: number;
};

export type SavingReturnSample = SavingReturn & {
  time: Date;
};
