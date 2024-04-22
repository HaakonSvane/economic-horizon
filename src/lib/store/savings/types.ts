import { Saving } from "@/types";
import { ProperOmit } from "@/types/utils";

export type AddSavingPayload = ProperOmit<Saving, "id">;

export type SavingsSlice = {
  savings: Saving[];
  addSaving: (saving: AddSavingPayload) => void;
  removeSaving: (id: string) => void;
  clearAllSavings: () => void;
};
