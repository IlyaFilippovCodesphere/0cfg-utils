import {debounce} from '../ts/debounce';
import { wait } from '../ts/wait';

test('debounce with no arguments', async () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 40);

    debouncedFunction();
    await wait(20);
    expect(mockFunction).not.toBeCalled();

    debouncedFunction();
    await wait(20);
    expect(mockFunction).not.toBeCalled();

    debouncedFunction();
    await wait(60);
    expect(mockFunction).toBeCalled();
});

test('debounce with arguments', async () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 40);

    debouncedFunction(1);
    await wait(20);
    expect(mockFunction).not.toBeCalled();

    debouncedFunction(2);
    await wait(20);
    expect(mockFunction).not.toBeCalled();

    debouncedFunction(3);
    await wait(60);
    expect(mockFunction).toBeCalledWith(3);
});