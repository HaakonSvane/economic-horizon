import { projectFund } from "@/lib/finance";
import { createAppSelector } from "@/lib/utils";
import { Saving } from "@/types";
import { createSelector } from "reselect";
import { ProjectedSaving } from "./types";

const makeProjectedSavingSelector = () =>
  createSelector(
    [
      (saving: Saving) => saving,
      (_: Saving, fromDate: Date) => fromDate,
      (_: Saving, __: Date, toDate: Date) => toDate,
    ],
    (saving, fromDate, toDate) => {
      if (saving.type === "fund")
        return projectFund(saving, fromDate, toDate, 150);
      return null;
    }
  );

export const selectAllProjectedSavings = createAppSelector(
  [
    (state) => state.savings,
    (_, fromDate: Date) => fromDate,
    (_, __: Date, toDate: Date) => toDate,
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
          projection?.map(
            (projection) =>
              ({
                ...projection,
                id: saving.id,
                name: saving.name,
              }) satisfies ProjectedSaving
          ) ?? []
        );
      })
      .flat() as ProjectedSaving[];
  }
);
