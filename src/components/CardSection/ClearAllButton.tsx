import { HTMLAttributes, forwardRef } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export type ClearAllButtonProps = {
  title?: string;
} & Omit<HTMLAttributes<HTMLButtonElement>, "children">;

export const ClearAllButton = forwardRef<
  HTMLButtonElement,
  ClearAllButtonProps
>(({ title = "Slett alle" }, ref) => {
  return (
    <Button ref={ref} variant="destructive" className="flex gap-x-2">
      <Trash />
      {title}
    </Button>
  );
});

ClearAllButton.displayName = "CardSection.ClearAllButton";
