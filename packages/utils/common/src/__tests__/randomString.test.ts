import {randomString} from '../ts/randomString';
import {has} from '../ts/has';

test('randomString', () => {
    for (let i = 0; i < 10_000; i++) {
        expect(randomString() !== '').toBe(true);
        expect(has(randomString())).toBe(true);
        expect(randomString() === randomString()).toBe(false);
        expect(randomString().length).toBeLessThanOrEqual(7);
    }
});
