import {BufferQueue} from '../ts/BufferQueue';

test('pushPeekPop', () => {
    const buffer = new BufferQueue<number>(3);
    expect(buffer.peek()).toBeUndefined();
    buffer.push(1);
    expect(buffer.peek()).toBe(1);
    buffer.push(2, 3);
    expect(buffer.peek()).toBe(1);
    expect(buffer.pop()).toBe(1);
    expect(buffer.pop()).toBe(2);
    expect(buffer.pop()).toBe(3);
    expect(buffer.pop()).toBeUndefined();
    expect(buffer.peek()).toBeUndefined();
});

test('overflow', () => {
    const buffer = new BufferQueue<number>(5);
    buffer.push(1, 2, 3, 4, 5);
    expect(buffer.peek()).toBe(1);
    buffer.push(6, 7); // buffer overflow
    expect(buffer['buffer']).toEqual([6, 7, 3, 4, 5]);
    expect(buffer.peek()).toBe(3);
});

test('flatten', () => {
    const buffer = new BufferQueue<number>(5);
    buffer.push(1, 2, 3);
    expect(buffer.flatten())
        .toEqual([1, 2, 3]);
    buffer.push(4, 5, 6, 7); // overflow
    expect(buffer.flatten()).toEqual([3, 4, 5, 6, 7]);
});

test('isEmpty', () => {
    const buffer = new BufferQueue<number>(5);
    expect(buffer.isEmpty()).toBeTruthy();
    buffer.push(1);
    expect(buffer.isEmpty()).toBeFalsy();
    buffer.pop();
    expect(buffer.isEmpty()).toBeTruthy();
});

test('clear', () => {
    const buffer = new BufferQueue<number>(5);
    buffer.push(1, 2, 3, 4);
    expect(buffer.isEmpty()).toBeFalsy();
    buffer.clear();
    expect(buffer.isEmpty()).toBeTruthy();
    expect(buffer.peek()).toBeUndefined();
});
