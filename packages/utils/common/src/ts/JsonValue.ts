/**
 * This union mimics the types allowed in RFC 7159.
 * @see https://tools.ietf.org/html/rfc7159
 */
export type JsonValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | JsonValue[]
    | {[key in string | number]: JsonValue};
