import { NewItemButton } from "@/components/NewItemButton";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { CirclePlus, Trash } from "lucide-react";

export const LoansSection = () => {
  const loans = useStore((state) => state.loans);

  return (
    <div className="flex grow flex-col gap-y-2">
      <div className="flex flex-row justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Lån
        </h3>
        {loans.length > 0 && (
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
      <NewItemButton title="Legg til nytt lån" />
    </div>
  );
};
