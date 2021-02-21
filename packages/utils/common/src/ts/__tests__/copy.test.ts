import {copy} from '../copy';

test('copy number', () => {
    expect(copy(1)).toEqual(1);
});

test('copy string', () => {
    expect(copy('copyme')).toBe('copyme');
});

test('copy symbol', () => {
    const symbol = Symbol('asdsadff');
    expect(copy(symbol)).toBe(symbol);
});

test('copy bool', () => {
    expect(copy(true)).toBe(true);
    expect(copy(false)).toBe(false);
});

test('copy fails with function', () => {
    expect(() => {
        copy(function () {
            const value = 1;
        });
    }).toThrow();
});

test('copy array', () => {
    const src = [1, 2, 3];
    expect(copy(src)).toEqual([1, 2, 3]);
    expect(copy(src)).not.toBe(src);
    expect(Array.isArray(copy(src))).toBeTruthy();
});

test('copy object', () => {
    const a = {
        aa: {
            aaa: 1,
        },
    };
    const b = copy(a);
    a.aa.aaa = 2;
    expect(b.aa.aaa).toEqual(2);
});

test('copy null', () => {
    expect(copy(null)).toBeNull();
});

test('copy undefined', () => {
    expect(copy(undefined)).toBeUndefined();
});

test('copy date', () => {
    const src = new Date();
    const copied = copy(src);
    expect(copied.getTime()).toEqual(src.getTime());
    expect(copied).toEqual(src);
    expect(copied).not.toBe(src);
    src.setFullYear(1980);
    expect(copied).not.toEqual(src);
    expect(copied.getFullYear()).not.toBe(1980);
});

test('copy empty object', () => {
    expect(copy({})).toEqual({});
    const anObject = {};
    expect(copy(anObject)).not.toBe(anObject);
});

test('copy of class instance', () => {
    class TestClassForCopy {
        bla: string;

        public constructor(bla: string) {
            this.bla = bla;
        }

        someMethod() {

        }
    }

    const srcObject = new TestClassForCopy('teststring');
    const bscPrototype = Object.getPrototypeOf(srcObject);

    const copied = copy(srcObject);
    const copiedPrototype = Object.getPrototypeOf(copied);

    expect(copied).toEqual(srcObject);
    expect(copied).not.toBe(srcObject);

    expect(srcObject.someMethod).toBeDefined();
    expect(copied.someMethod).toBeDefined();
    expect(copiedPrototype).toBe(bscPrototype);
});
