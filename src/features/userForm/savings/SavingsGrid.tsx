import { useStore } from "@/lib/store";
import { SavingsCard } from "./SavingsCard";
import { CardGrid } from "@/components/CardGrid";

export const SavingsGrid = () => {
  const savings = useStore((state) => state.savings);
  return (
    <CardGrid>
      {savings.map((saving) => (
        <SavingsCard saving={saving} key={saving.id} />
      ))}
    </CardGrid>
  );
};
