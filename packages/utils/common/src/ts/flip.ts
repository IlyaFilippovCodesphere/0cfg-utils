import {definedKeys} from './definedKeys';

type StringOrNumber = (string | number);

/**
 * Swaps key and value entries in an object.
 */
export const flip = (obj: Record<StringOrNumber, StringOrNumber>): Record<StringOrNumber, StringOrNumber> => {
    const result: Record<StringOrNumber, StringOrNumber> = {};
    definedKeys(obj).forEach((key: string) => {
        result[obj[key]] = key;
    });
    return result;
};
