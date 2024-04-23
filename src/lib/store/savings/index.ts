export * from "./slice";
export * from "./types";

import { selectAllProjectedSavings } from "./selectors";

export const selectors = {
  allProjected: selectAllProjectedSavings,
} as const;
