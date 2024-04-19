export type Either<T, U> = T | U extends object
  ?
      | (T & Partial<Record<Exclude<keyof U, keyof T>, never>>)
      | (U & Partial<Record<Exclude<keyof T, keyof U>, never>>)
  : T | U;
