export type PaymentPlanKeyFrame = {
  date: string;
  interest: number;
  principal: number;
};
export type PaymentPlan = PaymentPlanKeyFrame[];

export type Loan = {
  id: string;
  name?: string;
  type: "car" | "house" | "student" | "other";
  amountLeft: number;
  lastPaymentDate: number;
  interestRate: number;
  paymentPlan: "fixedRate" | PaymentPlan;
};
