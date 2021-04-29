const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Returns a string of random characters with a custom length.
 *
 * @returns a string containing random characters.
 */
export const randomString = (length = 7): string => {
    let str = '';

    for (let i = 0; i < length; i++) {
        str += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
    }

    return str;
};
