import { SavingReturnSample } from "@/lib/finance/types";
import { Saving } from "@/types";
import { ProperOmit } from "@/types/utils";

export type ProjectedSaving = SavingReturnSample & { id: string; name: string };

export type AddSavingPayload = ProperOmit<Saving, "id">;

export type SavingsSlice = {
  savings: Saving[];
  addSaving: (saving: AddSavingPayload) => void;
  removeSaving: (id: string) => void;
  clearAllSavings: () => void;
};
