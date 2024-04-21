import { createContext } from "react";

export type DynamicSVGContextType = {
  width: number;
  height: number;
};

export const DynamicSVGContext = createContext<DynamicSVGContextType | null>(
  null
);
