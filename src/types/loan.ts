export type PaymentPlanKeyFrame = {
    date: string;
    interest: number;
    principal: number;
}
export type PaymentPlan = PaymentPlanKeyFrame[];

export type Loan = {
    id: string;
    type: "car" | "house" | "student";
    amountLeft: number;
    yearsLeft: number;
    interestRate: number;
    paymentPlan: "fixedRate" | PaymentPlan;
}