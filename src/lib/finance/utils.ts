import { Saving } from "@/types";
import {
  differenceInMilliseconds,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export const getAvgMillisecondsForPeriod = (
  startDate: Date,
  endDate: Date,
  period: Saving["ratePeriod"]
): number => {
  let totalMilliseconds: number;
  let periodCount: number;

  switch (period) {
    case "monthly":
      totalMilliseconds = differenceInMilliseconds(endDate, startDate);
      periodCount = differenceInMonths(endDate, startDate);
      break;
    case "yearly":
      totalMilliseconds = differenceInMilliseconds(endDate, startDate);
      periodCount = differenceInYears(endDate, startDate);
      break;
    default:
      throw new Error(`Invalid ratePeriod: ${period}`);
  }

  if (periodCount === 0) {
    return totalMilliseconds;
  }

  return totalMilliseconds / periodCount;
};
