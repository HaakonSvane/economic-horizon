import { HTMLAttributes, forwardRef } from "react";

export type HeaderProps = HTMLAttributes<HTMLDivElement>;

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ children }, ref) => {
    return (
      <div className="flex flex-row justify-between" ref={ref}>
        {children}
      </div>
    );
  }
);

Header.displayName = "CardSection.Header";
