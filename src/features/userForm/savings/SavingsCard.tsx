import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Saving } from "@/types";
import { savingsTypeToIcon, savingsTypeToLabel } from "./utils";

export type SavingsCardProps = {
  saving: Saving;
};
export const SavingsCard = ({ saving }: SavingsCardProps) => {
  const Icon = savingsTypeToIcon(saving.type);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center text-lg font-medium gap-4">
            <Icon className="opacity-50 size-10" />
            {savingsTypeToLabel(saving.type)}
          </div>
        </CardTitle>
        <CardDescription>{saving.name}</CardDescription>
      </CardHeader>
    </Card>
  );
};
