/** Represents a predicate (boolean-valued function) of one argument. */
export type Predicate<T = any> =
    (arg: T) => boolean

export const not = <T = any>(p: Predicate<T>) => (arg: T) => !p(arg);
export const and = <T = any>(p0: Predicate<T>, p1: Predicate<T>) => (arg: T) => p0(arg) && p1(arg);
export const or = <T = any>(p0: Predicate<T>, p1: Predicate<T>) => (arg: T) => p0(arg) || p1(arg);
