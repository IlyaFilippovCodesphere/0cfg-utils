import {injectable} from 'inversify';
import {randomBytes} from 'crypto';
import {pbkdf2Sync} from 'pbkdf2';
import {btoa} from '../btoa';
import {atob} from '../atob';

import {
    utils,
    ModeOfOperation,
} from 'aes-js';
import TypedArray = NodeJS.TypedArray;

const {
    hex,
    utf8,
} = utils;

const {
    cbc,
} = ModeOfOperation;

export type StringCryptoOptions = {
    /**
     *  It must be as unique as possible.
     *  However, it is recommended that a salt is arbitrary and in any case it is at least 16 bytes long.
     */
    salt: string,
    /**
     *  It must be a number and should be set as high as possible.
     *  So, the more is the number of iterations, the more secure the derived key will be,
     *  but in that case it takes greater amount of time to complete.
     */
    iterations: number,
    /**
     * It is the key of the required byte length.
     */
    keylen: 16 | 24 | 32
    /** HMAC digest algorithm to derive a key of the required byte length */
    digest: 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512' | 'rmd160' | 'ripemd160'
}

/**
 * Encrypt and decrypt strings using PBKDF2 for key derivation and AES (defaulted to 16-bit / SHA512).
 * Improved Typescript version of https://github.com/jeanlescure/string-crypto.
 */
@injectable()
export class StringCrypto {
    public readonly encrypt: (str: string) => string;
    public readonly decrypt: (str: string) => string;

    public constructor(
        secret: string,
        options: StringCryptoOptions =
            {salt: 'iouhegrfjnasdvoihfwepij', iterations: 10, keylen: 16, digest: 'sha512'}) {
        this.encrypt = (str) => this.encryptWithSecret(str, secret, options);
        this.decrypt = (str) => this.decryptWithSecret(str, secret, options);
    }

    private deriveKey(secret: string, options: StringCryptoOptions): Buffer {
        const {
            salt, iterations, keylen, digest,
        } = options;
        return pbkdf2Sync(secret, salt, iterations, keylen, digest);
    }

    private encryptWithSecret(str: string, secret: string, options: StringCryptoOptions): string {
        let base64String: string = btoa(unescape(encodeURIComponent(str.toString())));
        const mod16Len = base64String.length % 16;
        if (mod16Len !== 0) {
            base64String += '='.repeat(16 - mod16Len);
        }
        const stringBytes = utf8.toBytes(base64String);
        const derivedKey = this.deriveKey(secret, options);
        const randomInitVector = randomBytes(16);
        const aesCBC = new cbc(derivedKey, randomInitVector);
        const encryptedBytes = aesCBC.encrypt(stringBytes);
        const encryptedHex = hex.fromBytes(encryptedBytes);
        const initVectorHex = hex.fromBytes(randomInitVector);
        return `${initVectorHex}_${encryptedHex}`;
    }

    private decryptWithSecret(str: string, secret: string, options: StringCryptoOptions): string {
        const derivedKey = this.deriveKey(secret, options);
        const encryptedParts: string[] = str.toString().split('_');
        if (encryptedParts.length !== 2) {
            throw new Error(`Incorrect format for encrypted string: ${secret}`);
        }
        const [
            initVectorHex,
            encryptedHex,
        ] = encryptedParts;
        const randomInitVector = hex.toBytes(initVectorHex);
        const encryptedBytes = hex.toBytes(encryptedHex);
        const aesCBC = new cbc(derivedKey, randomInitVector);
        const stringBytes = aesCBC.decrypt(encryptedBytes);
        const base64String = utf8.fromBytes(stringBytes);
        return decodeURIComponent(escape(atob(base64String)));
    }
}
