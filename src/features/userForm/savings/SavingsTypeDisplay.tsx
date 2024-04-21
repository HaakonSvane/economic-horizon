import { Saving } from "@/types";
import { savingsTypeToIcon, savingsTypeToLabel } from "./utils";

export const SavingsTypeDisplay = ({ saving }: { saving: Saving }) => {
  const Icon = savingsTypeToIcon(saving.type);
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 opacity-50" />
      {`${saving.name} - ${savingsTypeToLabel(saving.type)}`}
    </div>
  );
};
