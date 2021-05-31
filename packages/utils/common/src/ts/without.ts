/**
 * Returns an object without the provided keys.
 * Note that fields are copied only on the first level, while every other reference stays the same.
 *
 * Arrays are converted to objects.
 */
export const without = <T, U extends keyof T>(
    obj: T,
    ...keysToRemove: U[]): Omit<T, U> => {
    const result = Object.assign({}, obj);
    for (const key of keysToRemove) {
        delete result[key];
    }
    return result;
};