/**
 * Lets you map from the own properties of an object, with values
 * @param obj the object
 * @param mapper a callback with signature (key, value)
 * @return an array of the values your mapper returned
 */
export const mapEachProperty = <T = any>(obj: { [key: string]: any }, mapper: (key: string, value: any) => T): T[] =>
    Object.getOwnPropertyNames(obj).map(key => mapper(key, obj[key]));
