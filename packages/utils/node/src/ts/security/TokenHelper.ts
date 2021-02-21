import * as jwt from 'jsonwebtoken';
import {has} from '@codesphere/utils-common/lib/has';
import {equal} from '@codesphere/utils-common/lib/equal';
import * as http from 'http';

export class NoPrivateKeyError extends Error {
    public constructor() {
        super('An unknown private key is necessary to perform this operation.');
    }

}

export interface TokenConfig {
    /**
     * A RS512 private key
     *
     * If not set {@link TokenHelper.newToken} will throw a {@link NoPrivateKeyError}
     * but {@link TokenHelper.parseBearerAndVerify} can still be used.
     */
    readonly privateKey?: string,
    /**
     * A RS512 public key
     */
    readonly publicKey: string,
}

export class TokenHelper {

    private readonly config: TokenConfig;

    public constructor(config: TokenConfig) {
        if (!has(config.publicKey)) {
            throw new Error('Bad TokenConfig. Public key required.');
        }
        this.config = config;
        // Sign something to fail early if the algorithm or privateKey is not supported.
        if (has(config.privateKey)) {
            this.newToken({a: 'fail early'}, 1000);
        }
    }

    /**
     * @param payload The content of the new token
     * @param expiry Seconds from now until expiry
     */
    public newToken(payload: Record<string, unknown>, expiry: number): string {
        if (!has(this.config.privateKey)) {
            throw new NoPrivateKeyError();
        }

        delete payload.iat;
        delete payload.exp;

        return jwt.sign(payload, this.config.privateKey, {algorithm: 'RS512', expiresIn: expiry});
    }

    public verify<T>(token: string): string | T {
            return jwt.verify(token, this.config.publicKey) as string | T;
    }

    public parseBearerAndVerify<T>(headers: http.IncomingHttpHeaders): {content: T, token: string} {
        if (!has(headers)) {
            throw new Error('Malformed request headers: ' + JSON.stringify(headers));
        }
        if (!has(headers.authorization)) {
            throw new Error('Authorization header missing in headers: ' + JSON.stringify(headers));
        }
        const authSplit = headers.authorization.split(' ');
        if (authSplit.length !== 2) {
            throw new Error('Malformed authorization header' +
                ' (requires \'Authorization: <type> <credentials>\') but was \'Authorization: ' +
                headers.authorization + '\'.');
        }
        if (!equal(authSplit[0], 'Bearer')) {
            throw new Error('Malformed authorization header' +
                ' (requires \'Authorization: Bearer <credentials>\').' +
                ' type was not Bearer but ' + authSplit[0] + '.');
        }
        const token = authSplit[1];
        const rawContent = this.verify(token);
        let content;
        if (typeof rawContent === 'string') {
                content = JSON.parse(rawContent);
        } else {
            content = rawContent;
        }
        return {content, token};
    }
}
