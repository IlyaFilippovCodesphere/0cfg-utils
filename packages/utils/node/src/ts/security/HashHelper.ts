import {injectable} from 'inversify';
import * as crypto from 'crypto';
import {isA} from 'ts-type-checked';

export interface HashConfig {
    readonly salt: string,
    readonly algorithm: string
}

const DIGEST = 'hex';

@injectable()
export class HashHelper {

    private readonly config: HashConfig;

    public constructor(config: HashConfig) {
        if (!isA<HashConfig>(config)) {
            throw new Error('Bad config (requires HashConfig).');
        }
        this.config = config;
        // Hash something to fail early if the algorithm is not supported.
        this.hash('fail early');
    }

    public hash(secret: string): string {
        return crypto
            .createHash(this.config.algorithm)
            .update(secret + this.config.salt)
            .digest(DIGEST);
    }
}