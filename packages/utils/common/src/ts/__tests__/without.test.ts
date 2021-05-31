import {without} from '../without';

test('Use with object', () => {
    expect(
        without(
            {
                a: 1,
                b: '2',
                c: true,
                d: {a: 9},
                e: [],
            },
            'c', 'a', 'd'
        )
    ).toStrictEqual({
        b: '2',
        e: [],
    });
});

test('Use with array', () => {
    expect(without([1, '2', true], 1)).toEqual({0: 1, 2: true});
});
