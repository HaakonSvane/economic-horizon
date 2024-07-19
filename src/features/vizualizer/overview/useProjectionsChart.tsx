import { selectors, useStore } from "@/lib/store";
import { ProjectedSaving } from "@/lib/store/savings";
import * as d3 from "d3";
import { useEffect, useMemo } from "react";
import { useDynamicSVG } from "../DynamicSVG";

const MARGIN_LEFT = 40 as const;
const MARGIN_RIGHT = 20 as const;
const MARGIN_TOP = 20 as const;
const MARGIN_BOTTOM = 20 as const;

export const useProjectionsChart = (toDate: Date) => {
  const today = new Date();
  const { width, height, ref } = useDynamicSVG();
  const projectedSavings = useStore((state) =>
    selectors.savings.allProjected(state, today, toDate)
  );

  type Datum = [Date, d3.InternMap<string, ProjectedSaving>];

  const x = useMemo(
    () =>
      d3
        .scaleTime()
        .domain(d3.extent(projectedSavings, (d) => d.time) as [Date, Date])
        .rangeRound([MARGIN_LEFT, width - MARGIN_RIGHT]),
    [width, projectedSavings]
  );

  const y = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain(
          d3.extent(projectedSavings, (d) => d.netProfit) as [number, number]
        )
        .rangeRound([height - MARGIN_TOP, MARGIN_BOTTOM]),
    [height, projectedSavings]
  );

  const series = useMemo(
    () =>
      d3
        .stack<Datum>()
        .keys(d3.union(projectedSavings.map((d) => d.id)))
        .value(([, group], key) => group.get(key)?.netProfit ?? 0)(
        d3.index(
          projectedSavings,
          (d) => d.time,
          (d) => d.id
        )
      ),
    [projectedSavings]
  );

  const area = useMemo(
    () =>
      d3
        .area<d3.SeriesPoint<Datum>>()
        .x((d) => x(d.data[0]))
        .y0((d) => y(d[0]))
        .y1((d) => y(d[1])),
    [x, y]
  );

  const color = useMemo(
    () =>
      d3
        .scaleOrdinal()
        .domain(projectedSavings.map((saving) => saving.name))
        .range(d3.schemeSet2),
    [projectedSavings]
  );

  useEffect(() => {
    if (!ref?.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .call(d3.axisBottom(x))
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${MARGIN_LEFT},0)`)
      .call(d3.axisLeft(y).ticks(10))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - MARGIN_LEFT - MARGIN_RIGHT)
          .attr("stroke-opacity", 0.1)
      );

    svg
      .append("g")
      .selectAll()
      .data(series)
      .join("path")
      .attr("fill", (d) => color(d.key) as string)
      .attr("d", area)
      .append("title")
      .text((d) => d.key);
  }, [ref, series, color, area, x, y, width]);
};
