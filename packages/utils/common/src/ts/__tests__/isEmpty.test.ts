import {isEmpty} from '../isEmpty';

test('array', () => {
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty([1])).toBeFalsy();
});

test('object', () => {
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty({1: undefined, 2: null})).toBeTruthy();
    expect(isEmpty([1])).toBeFalsy();
});

test('string', () => {
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty('hi')).toBeFalsy();
});