export const btoa = (str: string): string => {
    return Buffer.from(str, 'binary').toString('base64');
};
