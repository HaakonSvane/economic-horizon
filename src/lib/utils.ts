import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type EmptyFormFields<T> = {
  [P in keyof T]: T[P] extends Date | null
    ? Date | null
    : T[P] extends (infer U)[] | null // Check if it's an array or null (though your use case doesn't mention arrays specifically)
      ? U[] | null
      : T[P] extends object | null
        ? T[P] extends null
          ? null
          : EmptyFormFields<T[P]>
        : T[P] extends number | string | null
          ? T[P] | "" // Allows for number, string, or their respective "empty" representation
          : never;
};
