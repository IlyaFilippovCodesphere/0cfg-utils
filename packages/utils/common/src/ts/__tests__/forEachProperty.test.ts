import {forEachProperty} from '../forEachProperty';

test('loops through each in object', () => {
    const obj = {1: jest.fn(), 'zwei': jest.fn()};
    forEachProperty(obj, (key, value: () => void) => {
        obj[key]();
        value();
    });
    expect(obj[1]).toBeCalledTimes(2);
    expect(obj['zwei']).toBeCalledTimes(2);
});