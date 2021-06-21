/**
 * This union mimics the types allowed in RFC 7159.
 * @see https://tools.ietf.org/html/rfc7159
 */
export type JsonValue = {
    [key in string | number]:
        JsonValue
        | Array<number | boolean | string | null | undefined | JsonValue>
        | number
        | boolean
        | string
        | null
        | undefined;
};
