export class Sequential {

    private sequential: number;

    public constructor(start: number = 1) {
        this.sequential = start;
    }

    public next(): number {
        return this.sequential++;
    }

    public get(): number {
        return this.sequential;
    }

}
