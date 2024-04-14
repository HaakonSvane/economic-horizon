import { useStore } from "@/lib/store";
import { SavingsCard } from "./SavingsCard";

export const SavingsGrid = () => {
  const savings = useStore((state) => state.savings);
  return (
    <div className="grid grid-cols-2 gap-2">
      {savings.map((saving) => (
        <SavingsCard saving={saving} key={saving.id} />
      ))}
    </div>
  );
};
