export type Deposit = {
  name: string;
  amount: number;
  interval: {
    every: number;
    period: "days" | "weeks" | "months" | "years";
    on: string;
  } | null;
};
