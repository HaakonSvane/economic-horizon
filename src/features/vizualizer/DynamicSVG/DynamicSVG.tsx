import { useClientRect } from "@/hooks/useClientRect";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useCallback, useRef } from "react";
import { DynamicSVGContext } from "./DynamicSVGContext";

export type DynamicSVGProps = HTMLAttributes<SVGElement>;

export const DynamicSVG = ({
  className,
  children,
  ...rest
}: DynamicSVGProps) => {
  const svgRef = useRef<SVGElement>(null);
  const { rect: { width, height } = { width: 0, height: 0 }, sizeRef } =
    useClientRect<SVGElement>();

  const handleRefs = useCallback(
    (node: SVGElement | null) => {
      sizeRef(node);
      if (node) {
        (svgRef as React.MutableRefObject<SVGElement | null>).current = node;
      }
    },
    [sizeRef, svgRef]
  );

  return (
    <DynamicSVGContext.Provider value={{ width, height, ref: svgRef }}>
      <svg {...rest} ref={handleRefs} className={cn("w-full", className)}>
        {(width || height) && children}
      </svg>
    </DynamicSVGContext.Provider>
  );
};
