import {deepCopy} from '../ts/deepCopy';

test('deepCopy', () => {
    const a = {
        aa: {
            aaa: 1,
        },
    };
    const b = deepCopy(a);
    expect(b).toEqual(a);
    expect(b).not.toBe(a);
    expect(b.aa).not.toBe(a.aa);
    a.aa.aaa = 2;
    expect(b.aa.aaa).toBe(1);
});