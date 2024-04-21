export type NullableEither<T, U> =
  | (T & { [K in keyof U]?: null })
  | (U & { [K in keyof T]?: null });

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- need it for the type
export type ProperOmit<T, K extends string | number | symbol> = T extends any
  ? Omit<T, K>
  : never;
