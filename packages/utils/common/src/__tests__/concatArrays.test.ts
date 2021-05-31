import {concatArrays} from '../ts/concatArrays';

test('concatArrays', () => {
    expect(concatArrays([1])).toEqual([1]); // most simple
    expect(concatArrays([1, 2], [], [3], [4])).toEqual([1, 2, 3, 4]); // standard
    // case
    expect(concatArrays([1], [2])).toEqual([1, 2]); // emptiness
    expect(concatArrays([])).toEqual([]); // emptiness
    expect(concatArrays([])).toEqual([]); // emptiness
    expect(concatArrays([], [])).toEqual([]); // emptiness
    expect(concatArrays([1], [], [2])).toEqual([1, 2]); // emptiness in
    // between
    expect(concatArrays([['inner', 'inner']])).toEqual([['inner', 'inner']]); // element is an array
    expect(concatArrays(['a', 'b'], ['c', 'd']))
        .toEqual(['a', 'b', 'c', 'd']); // strings
    expect(concatArrays(['a', null], ['c', 'd']))
        .toEqual(['a', null, 'c', 'd']); // strings and nulls
});
