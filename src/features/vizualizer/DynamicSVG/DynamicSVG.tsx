import { useClientRect } from "@/hooks/useClientRect";
import { HTMLAttributes } from "react";
import { DynamicSVGContext } from "./DynamicSVGContext";
import { cn } from "@/lib/utils";

export type DynamicSVGProps = HTMLAttributes<SVGElement>;

export const DynamicSVG = ({
  className,
  children,
  ...rest
}: DynamicSVGProps) => {
  const { rect: { width, height } = { width: 0, height: 0 }, sizeRef } =
    useClientRect<SVGElement>();

  return (
    <DynamicSVGContext.Provider value={{ width, height }}>
      <svg {...rest} ref={sizeRef} className={cn("w-full", className)}>
        {(width || height) && children}
      </svg>
    </DynamicSVGContext.Provider>
  );
};
