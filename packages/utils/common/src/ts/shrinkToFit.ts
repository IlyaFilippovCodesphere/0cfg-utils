import {has} from './has';

/**
 * Resulting array contains all values which are neither null nor undefined.
 */
export const shrinkToFit = <T>(arr: T[]) => {
    const result: T[] = [];
    if (has(arr)) {
        for (const entry of arr) {
            if (has(entry)) {
                result.push(entry);
            }
        }
    }
    return result;
};
