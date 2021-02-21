import {keys} from './keys';
import {has} from './has';

/**
 * Returns an array of a given object's own enumerable property names
 * which values are null or undefined, iterated in the same order that a normal loop would.
 */
export const nullOrUndefinedKeys = <T>(obj: T): (keyof T)[] => (keys(obj) as (keyof T)[])
    .filter(key => !has(obj[key]));
