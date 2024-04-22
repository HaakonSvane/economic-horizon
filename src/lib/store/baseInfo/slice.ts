import { StateCreator } from "zustand";
import { BaseInfoSlice } from "./types";

export const createBaseInfoSlice: StateCreator<BaseInfoSlice> = (set) => ({
  baseInfo: null,
  setBaseInfo: (baseInfo) => set({ baseInfo }),
});
