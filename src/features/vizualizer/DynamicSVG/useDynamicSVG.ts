import { useContext } from "react";
import { DynamicSVGContext } from "./DynamicSVGContext";

export const useDynamicSVG = () => {
  const context = useContext(DynamicSVGContext);
  if (context === null) {
    throw new Error("useDynamicSVG must be used within a DynamicSVG component");
  }
  return {
    ...context,
  };
};
