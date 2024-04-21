export type NullableEither<T, U> =
  | (T & { [K in keyof U]?: null })
  | (U & { [K in keyof T]?: null });
