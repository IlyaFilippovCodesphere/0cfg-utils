import {has} from './has';

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Subsequent calls to the debounced function return the result of the last `func` invocation.
 *
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @returns {Function} Returns the new debounced function.
 */
export const debounce = <ArgsT extends any[], ReturnT>(
    func: (...args: ArgsT) => ReturnT,
    wait: number = 0,
): (...args: ArgsT) => ReturnT => {
    let lastArgs: ArgsT | undefined;
    let result: ReturnT;
    let timerId: number | undefined;
    let lastCallTime: number | undefined;
    let lastInvokeTime = 0;

    function invokeFunc(time: number) {
        timerId = undefined;
        const args = lastArgs;

        lastInvokeTime = time;
        result = func(...args!);
        return result;
    }

    function remainingWait(time: number) {
        const timeSinceLastCall = time - (lastCallTime || 0);
        return wait - timeSinceLastCall;
    }

    function shouldInvoke(time: number) {
        const timeSinceLastCall = time - (lastCallTime || 0);
        return lastCallTime === undefined || (timeSinceLastCall >= wait);
    }

    function onTimerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return invokeFunc(time);
        }
        // Restart the timer.
        timerId = setTimeout(onTimerExpired, remainingWait(time));
    }

    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = undefined;
        lastCallTime = undefined;
        timerId = undefined;
    }

    function flush() {
        return timerId === undefined ? result : invokeFunc(Date.now());
    }

    function debounced(...args: ArgsT) {
        lastArgs = args;
        lastCallTime = Date.now();

        if (!has(timerId)) {
            timerId = setTimeout(onTimerExpired, wait);
        }

        return result;
    }

    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
};
