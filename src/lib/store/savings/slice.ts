import { nanoid } from "nanoid";
import { StateCreator } from "zustand";
import { SavingsSlice } from "./types";

export const createSavingsSlice: StateCreator<SavingsSlice> = (set, get) => ({
  savings: [],
  addSaving: (savingPayload) =>
    set({
      savings: [...get().savings, { ...savingPayload, id: nanoid(4) }],
    }),

  removeSaving: (id) =>
    set({
      savings: get().savings.filter((investment) => investment.id !== id),
    }),

  clearAllSavings: () => set({ savings: [] }),
});
