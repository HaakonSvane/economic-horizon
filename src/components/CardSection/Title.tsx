import { HTMLAttributes, forwardRef } from "react";

export type TitleProps = HTMLAttributes<HTMLHeadingElement>;

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ children }, ref) => {
    return (
      <h3
        ref={ref}
        className="scroll-m-20 text-2xl font-semibold tracking-tight"
      >
        {children}
      </h3>
    );
  }
);

Title.displayName = "CardSection.Title";
