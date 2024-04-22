import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createBaseInfoSlice } from "./baseInfo";
import { Store } from "./types";
import { createLoansSlice } from "./loans";
import { createSavingsSlice } from "./savings";
import { createTransactionsSlice } from "./transactions";

export const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...createBaseInfoSlice(...a),
      ...createLoansSlice(...a),
      ...createSavingsSlice(...a),
      ...createTransactionsSlice(...a),
    }),
    {
      name: "store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
