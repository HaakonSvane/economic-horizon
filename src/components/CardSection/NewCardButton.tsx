import { cn } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

export type NewCardButtonProps = {
  title: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const NewCardButton = forwardRef<HTMLButtonElement, NewCardButtonProps>(
  ({ title, className, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        className={cn(
          "flex flex-row justify-center items-center gap-x-2 h-24 text-lg font-medium text-muted-foreground rounded-lg border p-3 transition-all bg-primary-foreground hover:bg-accent disabled:pointer-events-none disabled:opacity-50",
          className
        )}
      >
        {title}
        <CirclePlus />
      </button>
    );
  }
);

NewCardButton.displayName = "CardSection.NewCardButton";
