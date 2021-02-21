import {has} from './has';
import {definedKeys} from './definedKeys';


/**
 * Returns a string array which contains all entries which are in before, but not in after.
 */
export const deletedEntries = (before: Record<string, unknown>, after: Record<string, unknown>): string[] =>
    definedKeys(before).filter(key => !has(after[key]));
