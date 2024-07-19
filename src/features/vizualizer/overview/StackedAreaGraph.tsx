import { addYears } from "date-fns";
import { DynamicSVG } from "../DynamicSVG";
import { useProjectionsChart } from "./useProjectionsChart";

export const StackedAreaGraph = () => {
  return (
    <DynamicSVG style={{ height: 400 }}>
      <StackedAreaGraphContent />
    </DynamicSVG>
  );
};

const StackedAreaGraphContent = () => {
  const today = new Date();
  const inTenYears = addYears(today, 10);
  useProjectionsChart(inTenYears);
  return <></>;
};
