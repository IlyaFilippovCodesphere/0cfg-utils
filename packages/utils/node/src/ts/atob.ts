export const atob = (str: string): string => {
    return Buffer.from(str, 'base64').toString('binary');
};
