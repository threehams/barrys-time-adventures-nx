type ValueOf<T> = T[keyof T];
type UnionToIntersection<T> = (T extends T ? (p: T) => void : never) extends (
  p: infer U,
) => void
  ? U
  : never;
type FromEntries<T extends readonly [PropertyKey, any]> = T extends T
  ? Record<T[0], T[1]>
  : never;
type Flatten<T> = {} & {
  [P in keyof T]: T[P];
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ObjectConstructor {
  keys<T extends { [key: string]: unknown }>(
    o: T,
  ): Array<Extract<keyof T, string>>;
  entries<T extends { [key: string]: unknown }, K extends keyof T>(
    o: T,
  ): Array<[Extract<keyof T, string>, T[K]]>;
  values<T extends { [key: string]: any }>(o: T): ValueOf<T>[];
  fromEntries<
    V extends PropertyKey,
    T extends [readonly [V, any]] | Array<readonly [V, any]>,
  >(
    entries: T,
  ): Flatten<UnionToIntersection<FromEntries<T[number]>>>;
}
