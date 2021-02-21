/**
 * Merge two objects into a new object.
 * Note that all keys are copied but references stay the same.
 */
export const merge = <A, B>(obj1: A, obj2: B): A & B => Object.assign({}, obj1, obj2);
