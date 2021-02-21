/**
 * A queue optimized for push and pop operations (no resize of arrays) which
 * overflows after the amount of elements added exceeds the size provided in
 * the constructor. It is intended as a buffer middleware for consumer producer
 * problems. You might want to just use an array if you do not care so much on
 * the performance of push and pop operations, but on reliability of data.
 * */
import {shrinkToFit} from './shrinkToFit';
import {concatArrays} from './concatArrays';

export class BufferQueue<T> {

    private readonly buffer: T[];
    private start: number = 0;
    private end: number = 0;

    public constructor(capacity: number) {
        this.buffer = new Array<T>(capacity);
    }

    public push(...elements: T[]) {
        for (const element of elements) {
            this.buffer[this.end % this.buffer.length] = element;
            if (this.end %
                this.buffer.length ===
                this.start %
                this.buffer.length &&
                this.end !==
                this.start) {
                this.start++;
            }
            this.end++;
        }
    }

    public pop(): T | undefined {
        return this.isEmpty() ?
            undefined :
            this.buffer[this.start++ % this.buffer.length];
    }

    public peek(): T | undefined {
        return this.isEmpty() ?
            undefined :
            this.buffer[this.start % this.buffer.length];
    }

    public isEmpty(): boolean {
        return this.start === this.end;
    }

    public flatten(): T[] {
        return shrinkToFit<T>(concatArrays( //
            this.buffer.slice(this.end % this.buffer.length,
                this.buffer.length),
            this.buffer.slice(0, this.end % this.buffer.length)));
    }

    public size(): number {
        return this.end % this.buffer.length - this.start % this.buffer.length;
    }

    public clear() {
        this.start = this.end;
    }

    /**
     * filled returns if the queue is complety filled with data
     * and has no undefined values.
     */
    public filled(): boolean {
        if (this.end - this.start === this.buffer.length) {
            return true;
        }
        return false;
    }
}
