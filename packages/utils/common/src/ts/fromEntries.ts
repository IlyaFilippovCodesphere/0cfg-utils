/**
 * The Object.fromEntries() method takes a list of key-value pairs and returns a new object whose properties are
 * given by those entries. The iterable argument is expected to be an object that implements an @@iterator method,
 * that returns an iterator object, that produces a two element array-like object, whose first element is a value
 * that will be used as a property key, and whose second element is the value to associate with that property key.
 * Object.fromEntries() performs the reverse of Object.entries().
 */
export const fromEntries = <KeyT, ValT>(arr: ([KeyT, ValT])[]) => Object.fromEntries(arr);
