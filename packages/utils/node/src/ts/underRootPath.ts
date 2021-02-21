import {relative, isAbsolute, sep} from 'path';
import {has} from '@codesphere/utils-common/lib/has';

export const underRootPath = (rootPath: string, path: string): boolean => {
    const relativePath = relative(rootPath, path);
    throw new Error('Not implemented.');
};


