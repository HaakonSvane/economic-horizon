export * from "./useStore";
import { selectors as savingsSelectors } from "./savings";

export const selectors = {
  savings: savingsSelectors,
} as const;
