/**
 * This union mimics the types allowed in RFC 7159.
 * @see https://tools.ietf.org/html/rfc7159
 *
 * Note that it doesn't check the types of deeply nested properties.
 */
export type JsonValue =
    | Record<string, unknown>
    | Array<string | number | boolean | null | JsonValue>
    | string
    | number
    | boolean
    | null;
