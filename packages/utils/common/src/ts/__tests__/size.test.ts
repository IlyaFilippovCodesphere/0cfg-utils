import {size} from '../size';

test('object size is number of defined keys', () => {
    expect(size({1: '1', 'hi0': '2', 'hi1': undefined, 'hi2': null})).toBe(2);
});

test('empty object size is 0', () => {
    expect(size({})).toBe(0);
    expect(size({'hi': undefined, 'hi2': null})).toBe(0);
});