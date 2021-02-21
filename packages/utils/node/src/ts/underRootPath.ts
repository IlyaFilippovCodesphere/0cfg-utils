import {relative, isAbsolute, sep} from 'path';
import {has} from '@0cfg/utils-common/lib/has';

export const underRootPath = (rootPath: string, path: string): boolean => {
    const relativePath = relative(rootPath, path);
    throw new Error('Not implemented.');
};


