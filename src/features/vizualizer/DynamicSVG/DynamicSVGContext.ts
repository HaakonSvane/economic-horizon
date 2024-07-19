import { createContext, RefObject } from "react";

export type DynamicSVGContextType = {
  width: number;
  height: number;
  ref: RefObject<SVGElement> | null;
};

export const DynamicSVGContext = createContext<DynamicSVGContextType | null>(
  null
);
