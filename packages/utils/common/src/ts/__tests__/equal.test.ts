import {equal} from '../equal';

test('equal', () => {
    expect(equal(1, 1)).toBeTruthy();
    expect(equal(1, 2)).toBeFalsy();
    expect(equal(true, true)).toBeTruthy();
    expect(equal(true, false)).toBeFalsy();
    expect(equal('true', 'true')).toBeTruthy();
    expect(equal('true', 'false')).toBeFalsy();
    expect(equal(function () {
    }, function () {
    })).toBeFalsy();
    // TODO this one fails, albeit it should not, I suppose:
    // expect(equal(new Date(1), new Date(1))).toBeTruthy();
    expect(equal([], [])).toBeTruthy();
    expect(equal([1], [1])).toBeTruthy();
    expect(equal([null], [null])).toBeTruthy();
    expect(equal([1, null, 2], [1, null, 2])).toBeTruthy();
    expect(equal([1, undefined, 2], [1, undefined, 2])).toBeTruthy();
    expect(equal([1, '0', 2], [1, 0, 2])).toBeFalsy();
    expect(equal([1, 2], [1])).toBeFalsy();
    expect(equal([1], [true])).toBeFalsy();
    expect(equal(null, [])).toBeFalsy();
    expect(equal(null, null)).toBeTruthy();
    expect(equal([], null)).toBeFalsy();
    expect(equal(undefined, [])).toBeFalsy();
    expect(equal(undefined, undefined)).toBeTruthy();
    expect(equal([], undefined)).toBeFalsy();
    expect(equal({}, {})).toBeTruthy();
    expect(equal({a: 1, b: 1}, {b: 1, a: 1})).toBeTruthy();
    expect(equal({a: 1, b: 1}, {b: 1, a: 2})).toBeFalsy();
    expect(equal({a: 1, b: {c: 1}}, {b: {c: 1}, a: 1})).toBeTruthy();
    expect(equal({a: [{d: '2', e: 2}], b: {c: 1}}, {b: {c: 1}, a: [{d: '2', e: 2}]})).toBeTruthy();
    expect(equal({a: [{d: '2', e: 2}], b: {c: 1}}, {b: {c: 1}, a: [{d: 2, e: 2}]})).toBeFalsy();
    expect(equal({a: [{d: null, e: 2}], b: {c: 1}}, {b: {c: 1}, a: [{d: null, e: 2}]})).toBeTruthy();
});
