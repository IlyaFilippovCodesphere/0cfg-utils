const {Entropy: entropy} = require('entropy-string');
import {injectable} from 'inversify';

/*
* Generates a potential of 1 million random strings with one in a billion chance of repeat.
*/
@injectable()
export class UnguessableIdGenerator {

    private random = new entropy()
    private bits = entropy.bits(1e6, 1e9);

    /**
     * Generate a new random id.
     */
    public next(): string {
        return this.random.string(this.bits);
    }
}
