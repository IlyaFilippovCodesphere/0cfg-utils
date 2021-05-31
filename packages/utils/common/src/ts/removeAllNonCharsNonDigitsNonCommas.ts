import {has} from '@0cfg/utils-common/lib/has';

/**
 * Removes all but a-z, A-Z, 0-9 and ',' from value.
 * @param value the string value
 * @returns the value with only the allowed chars
 */
export const removeAllNonCharsNonDigitsNonCommas = (value: string): string => {
    if (!has(value)) {
        return value;
    }
    return value.replace(/[^a-zA-Z0-9\,]/g, '');
};
