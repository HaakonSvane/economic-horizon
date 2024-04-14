export type Transaction = {
  id: string;
  type: "withdrawal" | "deposit";
  name: string;
  amount: number;
  interval: {
    every: number;
    period: "days" | "weeks" | "months" | "years";
    on: string;
  } | null;
};
