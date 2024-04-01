export type Loan = {
  id: string;
  name: string | null;
  type: "car" | "house" | "student" | "other";
  paymentPlanOption: "annuity" | "series";
  lastPayment: number;
  amountLeft: number;
  termDate: string;
  interestRate: number;
};
