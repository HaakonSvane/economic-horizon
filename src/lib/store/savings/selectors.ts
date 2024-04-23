import { projectFund } from "@/lib/finance";
import { createAppSelector } from "@/lib/utils";
import { Saving } from "@/types";
import { createSelector } from "reselect";
import { ProjectedSaving } from "./types";

const makeProjectedSavingSelector = () =>
  createSelector(
    [
      (saving: Saving) => saving,
      (saving: Saving, fromDate: Date) => fromDate,
      (saving: Saving, fromDate: Date, toDate: Date) => toDate,
    ],
    (saving, fromDate, toDate) => {
      if (saving.type === "fund")
        return projectFund(saving, fromDate, toDate, 10);
      return null;
    }
  );

export const selectAllProjectedSavings = createAppSelector(
  [
    (state) => state.savings,
    (state, fromDate: Date) => fromDate,
    (state, fromDate: Date, toDate: Date) => toDate,
  ],
  (savings, fromDate, toDate) => {
    const projectionSelectors = savings.reduce(
      (acc, saving) => {
        if (!acc[saving.id]) {
          acc[saving.id] = makeProjectedSavingSelector();
        }
        return acc;
      },
      {} as Record<string, ReturnType<typeof makeProjectedSavingSelector>>
    );

    return savings
      .map((saving) => {
        const projection = projectionSelectors[saving.id](
          saving,
          fromDate,
          toDate
        );
        return (
          projection?.map((projection) => ({ ...projection, id: saving.id })) ??
          []
        );
      })
      .flat() as ProjectedSaving[];
  }
);
