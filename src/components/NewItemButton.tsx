import { cn } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import { HTMLAttributes, forwardRef } from "react";

export type NewItemButtonProps = {
  title: string;
} & Omit<HTMLAttributes<HTMLButtonElement>, "children">;

export const NewItemButton = forwardRef<HTMLButtonElement, NewItemButtonProps>(
  ({ title, className, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        className={cn(
          "flex flex-row justify-center items-center gap-x-2 h-24 text-lg font-medium text-muted-foreground rounded-lg border p-3 transition-all hover:bg-accent",
          className
        )}
      >
        {title}
        <CirclePlus />
      </button>
    );
  }
);
