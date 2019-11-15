import camelCase from 'lodash/camelCase';
import defaultsDeep from 'lodash/defaultsDeep';
import defaultTo from 'lodash/defaultTo';
import isEqual from 'lodash/isEqual';
import isPlainObject from 'lodash/isPlainObject';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';
import orderBy from 'lodash/orderBy';
import union from 'lodash/union';
import zipObject from 'lodash/zipObject';

import * as T from '../types';

export { camelCase, defaultsDeep, defaultTo, isEqual, isPlainObject, merge, mergeWith, orderBy, union, zipObject };

// LANG ====================================================================================================================================

export const isEmpty = (obj: any) => (Array.isArray(obj) ? obj : Object.keys(obj)).length === 0;
export const toNumber = (v: string): number => +v;

// OBJECT ==================================================================================================================================

export function omit<O extends object, K extends keyof O>(obj: O, keys: K[]): Omit<O, K> {
  const res: any = { ...obj };
  for (const key of keys) delete res[key];
  return res;
}

export function pick<O extends object, K extends keyof O>(obj: O, keys: K[]): Pick<O, K> {
  if (!obj || !keys) return obj;
  const res: any = {};
  for (const key of keys) res[key] = obj[key];
  return res;
}

export function map<O extends object, R>(obj: O, mapper: (value: O[keyof O], key: string) => R): R[] {
  return Object.keys(obj).map((k) => mapper(obj[k], k));
}

export function reduce<O extends object, R>(obj: O, reducer: (acc: R, value: O[keyof O], key: string) => R, initial: R): R {
  return Object.keys(obj).reduce((acc, k) => reducer(acc, obj[k], k), initial);
}

export function mapValues<O extends object, R>(obj: O, mapper: (v: O[keyof O], k: string) => R): { [P in keyof O]: R } {
  return Object.keys(obj).reduce((acc, k) => ({ ...acc, [k]: mapper(obj[k], k) }), {} as any);
}

// ARRAY ===================================================================================================================================

export function difference<O>(arr1: O[], arr2: O[]): O[] {
  return (arr1 || []).filter((item) => !(arr2 || []).includes(item));
}

export function intersection<O>(arr1: O[], arr2: O[]): O[] {
  return (arr1 || []).filter((item) => (arr2 || []).includes(item));
}

// STRING ==================================================================================================================================

export const endsWith = (str: string, target: string): boolean => (str && target && str.endsWith(target)) || false;
export const lowerFirst = (str: string): string => (str && str.length > 0 ? str.charAt(0).toLowerCase() + str.slice(1) : str);
export const startsWith = (str: string, target: string): boolean => (str && target && str.startsWith(target)) || false;
export const upperCase = (str: string): T.Maybe<string> => (str ? str.toUpperCase() : null);
export const upperFirst = (str: string): string => (str && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str);

// UTIL ====================================================================================================================================

export const identity = (i: any) => i;
