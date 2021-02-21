import {inRange} from '../inRange';

test('true if in incluisive range', () => {
    expect(inRange(4, 4, 5)).toBe(true);
    expect(inRange(4, 4, 4)).toBe(true);
    expect(inRange(4, 5, 4)).toBe(true);
    expect(inRange(3.2, 3, 4)).toBe(true);
    expect(inRange(2, 1, 3)).toBe(true);
});

test('false if in not in inclusive range', () => {
    expect(inRange(0.9, 0.91, 0.92)).toBe(false);
    expect(inRange(0.92, 0.9, 0.91)).toBe(false);
    expect(inRange(1, 2, 3)).toBe(false);
});
