/**
 * Executes all functions in the provided array.
 */
export const execAll = (f: (() => void)[]) => f.forEach(entry => entry());
