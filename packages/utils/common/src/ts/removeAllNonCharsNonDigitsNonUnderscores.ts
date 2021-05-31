import {has} from './has';

/**
 * Removes all but a-z, A-Z, 0-9 and '_' from value.
 * @param value the string value
 * @returns the value with only the allowed chars
 */
export const removeAllNonCharsNonDigitsNonUnderscores = (value: string): string => {
    if (!has(value)) {
        return value;
    }
    return value.replace(/[^a-zA-Z0-9_]/g, '');
};
