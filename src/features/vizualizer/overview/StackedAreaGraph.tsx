import { DynamicSVG, useDynamicSVG } from "../DynamicSVG";
import * as d3 from "d3";

export const StackedAreaGraph = () => {
  return (
    <DynamicSVG>
      <StackedAreaGraphContent />
    </DynamicSVG>
  );
};

const StackedAreaGraphContent = () => {
  const { width, height } = useDynamicSVG();
  const test = d3.stack().keys(["apples", "bananas", "cherries", "dates"]);

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
