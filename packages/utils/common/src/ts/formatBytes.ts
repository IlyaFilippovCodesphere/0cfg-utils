/**
 * Convert bytes to human readable byte sizes.
 * @see https://stackoverflow.com/a/18650828
 */
export const formatBytes = (bytes: number, decimals: number = 0): string => {
    if (bytes < 0) {
        throw new Error('No negative byte number allowed.');
    }

    if (decimals < 0) {
        throw new Error('No negative decimals allowed.');
    }

    if (bytes === 0) {
        return '0';
    }

    const baseSize = 1024;
    const suffixes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const exponent = Math.floor(Math.log(bytes) / Math.log(baseSize));
    return parseFloat((bytes / Math.pow(baseSize, exponent)).toFixed(decimals)) + ' ' + suffixes[exponent];
};
