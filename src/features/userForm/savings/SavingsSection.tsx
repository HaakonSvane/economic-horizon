import { NewItemButton } from "@/components/NewItemButton";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { CirclePlus, Trash } from "lucide-react";

export const SavingsSection = () => {
  const investments = useStore((state) => state.investments);

  return (
    <div className="flex grow flex-col gap-y-2">
      <div className="flex flex-row justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Sparing
        </h3>
        {investments.length > 0 && (
          <div>
            <Button>
              <CirclePlus />
            </Button>
            <Button>
              Slett alle
              <Trash />
            </Button>
          </div>
        )}
      </div>
      <NewItemButton title="Legg til ny sparing" />
    </div>
  );
};
