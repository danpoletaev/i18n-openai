import { ObjectArrayOrString, ObjectType } from '../types/common';
export const isObject = (obj: any) => obj !== null && typeof obj === 'object' && !Array.isArray(obj);
export const isArray = (arr: any) => Array.isArray(arr);
