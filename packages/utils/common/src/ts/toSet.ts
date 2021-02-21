export const toSet = (arr: (string | number)[]): Record<string | number, 1> => {
    const result: Record<string | number, 1> = {};
    for (const entry of arr) {
        result[entry] = 1;
    }
    return result;
};

export const toNullSet = (arr: (string | number)[]): Record<string | number, null> => {
    const result: Record<string | number, null> = {};
    for (const entry of arr) {
        result[entry] = null;
    }
    return result;
};
