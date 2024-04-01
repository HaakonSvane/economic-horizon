import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type EmptyFormFields<T extends object> = {
  [P in keyof T]: T[P] extends object
    ? EmptyFormFields<T[P]>
    : T[P] extends []
      ? []
      : T[P] extends number
        ? number | ""
        : T[P] extends string
          ? string | ""
          : T[P];
};
