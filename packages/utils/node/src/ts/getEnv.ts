import {has} from '@codesphere/utils-common/lib/has';

export class EnvVariableNotSetError extends Error {
    public constructor(name: string) {
        super(`Environment variable ${name} is not set.`);
    }
}

/**
 * Fetches a system environment variable.
 * Throws an error if the variable is not set.
 *
 * @param name The name of the environment variable.
 */
export const getEnv = (name: string): string => {
    const value = process.env[name];
    if (!has(value)) {
        throw new EnvVariableNotSetError(name);
    }
    return value;
};