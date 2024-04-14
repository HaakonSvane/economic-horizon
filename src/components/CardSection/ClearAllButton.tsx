import { Trash } from "lucide-react";
import { forwardRef } from "react";
import { Button, ButtonProps } from "../ui/button";

export type ClearAllButtonProps = {
  title?: string;
} & Omit<ButtonProps, "children">;

export const ClearAllButton = forwardRef<
  HTMLButtonElement,
  ClearAllButtonProps
>(({ title = "Slett alle", ...buttonProps }, ref) => {
  return (
    <Button
      ref={ref}
      variant="destructive"
      className="flex gap-x-2"
      {...buttonProps}
    >
      <Trash />
      {title}
    </Button>
  );
});

ClearAllButton.displayName = "CardSection.ClearAllButton";
