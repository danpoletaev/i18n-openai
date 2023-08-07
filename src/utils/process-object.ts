import { ObjectArrayOrString, ObjectType, ProcessFunction } from '../interface';
import { isArray } from './array';

/**
 * Recursively processes each string in object with passed processStr function
 */
export const processEachStringInObject = async (
  obj: ObjectArrayOrString,
  processStr: ProcessFunction,
  locale: string,
) => {
  const result: ObjectType = {};

  if (JSON.stringify(obj) === JSON.stringify([])) {
    return [];
  }
  if (typeof obj === 'string') {
    return await processStr(obj, locale);
  }

  for (const [key, value] of Object.entries(obj)) {
    let v = null;

    if (typeof value === 'string') {
      v = await processStr(value, locale);
    } else if (isArray(value)) {
      v = value;
      for (let i = 0; i < value.length; i++) {
        v[i] = await processEachStringInObject(value[i], processStr, locale);
      }
    } else if (value === undefined || value === null) {
      v = null;
      console.error(`[${key}] value is null`);
    } else if (typeof value === 'object') {
      v = await processEachStringInObject(value, processStr, locale);
    } else {
      // in case number or boolean
      v = await processStr(`${value}`, locale);
    }
    result[key] = v;
  }

  return result;
};
