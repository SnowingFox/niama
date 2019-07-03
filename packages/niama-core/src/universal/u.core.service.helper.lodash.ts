import defaultsDeep from 'lodash/defaultsDeep';
import defaultTo from 'lodash/defaultTo';
import isEqual from 'lodash/isEqual';
import isPlainObject from 'lodash/isPlainObject';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';
import orderBy from 'lodash/orderBy';
import union from 'lodash/union';
import zipObject from 'lodash/zipObject';

export { defaultsDeep, defaultTo, isEqual, isPlainObject, merge, mergeWith, orderBy, union, zipObject };

// LANG ====================================================================================================================================

export const isEmpty = (obj: any) => (Array.isArray(obj) ? obj : Object.keys(obj)).length === 0;
export const toNumber = (v: string): number => +v;

// OBJECT ==================================================================================================================================

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): N.Omit<T, K> {
  const res: any = { ...obj };
  for (const key of keys) delete res[key];
  return res;
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  if (!obj || !keys) return obj;
  const res: any = {};
  for (const key of keys) res[key] = obj[key];
  return res;
}

export function map<T extends object, R>(obj: T, mapper: (value: T[keyof T], key: string) => R): R[] {
  return Object.keys(obj).map((k) => mapper(obj[k], k));
}

export function reduce<T extends object, R>(obj: T, reducer: (acc: R, value: T[keyof T], key: string) => R, initial: R): R {
  return Object.keys(obj).reduce((acc, k) => reducer(acc, obj[k], k), initial);
}

export function mapValues<T extends object, R>(obj: T, mapper: (v: T[keyof T], k: string) => R): { [P in keyof T]: R } {
  return Object.keys(obj).reduce((acc, k) => ({ ...acc, [k]: mapper(obj[k], k) }), {} as any);
}

// ARRAY ===================================================================================================================================

export function difference<T>(arr1: T[], arr2: T[]): T[] {
  return (arr1 || []).filter((item) => !(arr2 || []).includes(item));
}

export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return (arr1 || []).filter((item) => (arr2 || []).includes(item));
}

// STRING ==================================================================================================================================

export const endsWith = (str: string, target: string): boolean => {
  if (!str || !target) return false;
  const position: number = str.length - target.length;
  return position >= 0 && str.slice(position) === target;
};

export const lowerFirst = (str: string): string => (str && str.length > 0 ? str.charAt(0).toLowerCase() + str.slice(1) : str);
export const startsWith = (str: string, target: string): boolean => !!str && !!target && str.slice(0, target.length) === target;
export const upperCase = (str: string): string | null => (!!str ? str.toUpperCase() : null);
export const upperFirst = (str: string): string => (str && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str);

// UTIL ====================================================================================================================================

export const identity = (i: any) => i;
