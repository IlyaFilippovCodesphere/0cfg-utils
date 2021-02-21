/** Copies all elements of the sub arrays into a new single array.
 * Written for performance.
 * Example:
 * concatArrays([1,2],[3,4]) === [1,2,3,4]
 *
 * null and non-array elements in the array are allowed and will be handled
 * like an empty array
 **/
export const concatArrays = <T>(...arrayOfArrays: T[][]): T[] => {
    if (arrayOfArrays === null) {
        return new Array<T>(0);
    }
    let totalSize = 0;
    const countOfArrays = arrayOfArrays.length;
    for (let i = 0; i < countOfArrays; i++) {
        const currentAr = arrayOfArrays[i];
        if (currentAr === null || currentAr.constructor !== Array) {
            continue;
        }
        totalSize = totalSize + currentAr.length;
    }
    const result: T[] = new Array<T>(totalSize);
    let currentPosition = 0;
    for (let i = 0; i < arrayOfArrays.length; i++) {
        const currentAr = arrayOfArrays[i];
        if (currentAr === null || currentAr.constructor !== Array) {
            continue;
        }
        const currentArLength = currentAr.length;
        for (let n = 0; n < currentArLength; n++) {
            result[currentPosition + n] = currentAr[n];
        }
        currentPosition += currentArLength;
    }
    return result as T[];
};
