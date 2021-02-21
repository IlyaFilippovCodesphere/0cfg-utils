import {has} from '../has';

test('false for null or undefined', () => {
    expect(has(undefined)).toBeFalsy();
    expect(has(null)).toBeFalsy();
});

test('false if not in object or array', () => {
    const obj: any = {};
    expect(has(obj.notInObject)).toBeFalsy();
    const arr: number[] = [];
    expect(has(arr[0])).toBeFalsy();
});

test('true for primitives objects and arrays', () => {
    expect(has(true)).toBeTruthy();
    expect(has(false)).toBeTruthy();
    expect(has(0)).toBeTruthy();
    expect(has(1)).toBeTruthy();
    expect(has('')).toBeTruthy();
    expect(has('hi')).toBeTruthy();
    const obj = {defined: 1};
    expect(has(obj)).toBeTruthy();
    expect(has(obj.defined)).toBeTruthy();
    const arr = ['hi'];
    expect(has(arr)).toBeTruthy();
    expect(has(arr[0])).toBeTruthy();
});