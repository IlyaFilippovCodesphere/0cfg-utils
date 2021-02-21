import {has} from './has';
import {values} from './values';

/**
 * Returns an array of a given object's own values
 * which are neither null nor undefined, iterated in the same order that a normal loop would.
 */
export const definedValues = <V>(obj: Record<string | number, V>): V[] => values(obj).filter(has);
