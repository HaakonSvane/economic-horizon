import { CirclePlus } from "lucide-react";
import { forwardRef } from "react";
import { Button, ButtonProps } from "../ui/button";

export type AddButtonProps = Omit<ButtonProps, "children">;

export const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(
  ({ ...buttonProps }, ref) => {
    return (
      <Button ref={ref} variant="outline" {...buttonProps}>
        <CirclePlus />
      </Button>
    );
  }
);

AddButton.displayName = "CardSection.AddButton";
