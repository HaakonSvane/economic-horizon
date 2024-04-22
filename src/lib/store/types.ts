import { BaseInfoSlice } from "./baseInfo";
import { LoansSlice } from "./loans";
import { SavingsSlice } from "./savings";
import { TransactionsSlice } from "./transactions";

export type Store = BaseInfoSlice &
  LoansSlice &
  SavingsSlice &
  TransactionsSlice;
