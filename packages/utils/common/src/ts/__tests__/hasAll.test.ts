import {hasAll} from '../hasAll';

test('true if has all', () => {
    expect(hasAll('', true, 1)).toBeTruthy();
});

test('false if not has one', () => {
    expect(hasAll('', true, 1, null)).toBeFalsy();
    expect(hasAll('', true, 1, undefined)).toBeFalsy();
});