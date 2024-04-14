import { PropsWithChildren } from "react";

export const CardGrid = ({ children }: PropsWithChildren) => {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
};
