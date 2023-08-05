import { ObjectArrayOrString, ObjectType, ProcessFunction } from '../../types/common';
import { isArray } from './array';

export const processEachStringInObject = async (obj: ObjectArrayOrString, processStr: ProcessFunction) => {
  const result: ObjectType = {};

  if (JSON.stringify(obj) === JSON.stringify([])) {
    return [];
  }
  if (typeof obj === 'string') {
    return await processStr(obj);
  }

  for (const [key, value] of Object.entries(obj)) {
    let v = null;

    if (typeof value === 'string') {
      v = await processStr(value);
    } else if (isArray(value)) {
      v = value;
      for (let i = 0; i < value.length; i++) {
        v[i] = await processEachStringInObject(value[i], processStr);
      }
    } else if (value === undefined || value === null) {
      v = null;
      console.error(`[${key}] value is null`);
    } else if (typeof value === 'object') {
      v = await processEachStringInObject(value, processStr);
    } else {
      // in case number or boolean
      v = await processStr(`${value}`);
    }
    result[key] = v;
  }

  return result;
};
