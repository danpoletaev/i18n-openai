import { ObjectArrayOrString, ObjectType } from '../types/common';
import { isArray } from './utils';

export const processEachStringInObject = (obj: ObjectArrayOrString, processStr: (str: string) => string) => {
  const result: ObjectType = {};

  if (JSON.stringify(obj) == JSON.stringify([])) {
    return [];
  }
  if (typeof obj === 'string') {
    return processStr(obj);
  }

  for (let [key, value] of Object.entries(obj)) {
    let v = null;

    if (typeof value === 'string') {
      v = processStr(value);
    } else if (Array.isArray(value)) {
      v = value;
      for (let i = 0; i < value.length; i++) {
        v[i] = processEachStringInObject(value[i], processStr);
      }
    } else if (value === undefined || value === null) {
      v = null;
      console.error(`[${key}] value is null`);
    } else if (typeof value === 'object') {
      v = processEachStringInObject(value, processStr);
    } else {
      // in case number or boolean
      v = processStr(`${value}`);
    }
    result[key] = v;
  }

  return result;
};
