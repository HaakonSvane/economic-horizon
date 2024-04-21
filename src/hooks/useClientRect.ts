import { useCallback, useMemo, useRef, useState } from "react";

export const useClientRect = <T extends Element = Element>() => {
  const element = useRef<T | null>(null);
  const [rect, setRect] = useState<DOMRect>();

  const observer = useMemo(
    () =>
      new ResizeObserver((entries) => {
        setRect(entries.at(0)?.target.getBoundingClientRect());
      }),
    []
  );

  const sizeRef = useCallback(
    (node: T | null) => {
      if (node !== null) {
        element.current = node;
        observer.observe(node);
      } else if (element.current !== null) {
        observer.unobserve(element.current);
        element.current = null;
      }
    },
    [observer]
  );
  return {
    sizeRef,
    rect,
  };
};
