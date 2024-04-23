import { selectors, useStore } from "@/lib/store";
import { DynamicSVG, useDynamicSVG } from "../DynamicSVG";
import * as d3 from "d3";
import { addDays } from "date-fns";
import { ProjectedSaving } from "@/lib/store/savings";
import { useMemo } from "react";

export const StackedAreaGraph = () => {
  return (
    <DynamicSVG>
      <StackedAreaGraphContent />
    </DynamicSVG>
  );
};

const StackedAreaGraphContent = () => {
  const { width, height } = useDynamicSVG();
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const projectedSavings = useStore((state) =>
    selectors.savings.allProjected(state, today, tomorrow)
  );

  const { x, y, layers } = useMemo(() => {
    if (projectedSavings.length === 0)
      return {
        x: undefined,
        y: undefined,
        layers: undefined,
      };
    const x = d3
      .scaleTime()
      .rangeRound([0, width])
      .domain(d3.extent(projectedSavings, (d) => d.time) as [Date, Date]);

    const y = d3.scaleLinear().rangeRound([height, 0]);

    const stack = d3
      .stack<ProjectedSaving>()
      .keys(Object.keys(projectedSavings[0]).filter((key) => key !== "time"))
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const layers = stack(projectedSavings);

    return { x, y, layers };
  }, [projectedSavings]);

  console.log({ x, y, layers });

  return (
    <>
      <rect
        x={0}
        y={0}
        width={width / 2 - 5}
        height={height / 2 - 5}
        fill="lightblue"
      />
      <rect
        x={width / 2 + 5}
        y={0}
        width={width / 2 - 5}
        height={height / 2 - 5}
        fill="lightgrey"
      />
      <rect
        x={0}
        y={height / 2 + 5}
        width={width / 2 - 5}
        height={height / 2 - 5}
        fill="lightgreen"
      />
      <rect
        x={width / 2 + 5}
        y={height / 2 + 5}
        width={width / 2 - 5}
        height={height / 2 - 5}
        fill="lightorange"
      />
    </>
  );
};
