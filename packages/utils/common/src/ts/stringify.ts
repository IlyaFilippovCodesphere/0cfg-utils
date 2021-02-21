import {JsonValue} from './JsonValue';

/**
 * Shortcut for JSON.stringify with improved types.
 */
export const stringify = (obj: JsonValue): string => JSON.stringify(obj);
