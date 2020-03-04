import camelCase from 'lodash/camelCase';
import chunk from 'lodash/chunk';
import defaultsDeep from 'lodash/defaultsDeep';
import defaultTo from 'lodash/defaultTo';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';
import orderBy from 'lodash/orderBy';
import random from 'lodash/random';
import union from 'lodash/union';
import zipObject from 'lodash/zipObject';

import * as T from '../types';

export { camelCase, chunk, defaultsDeep, defaultTo, filter, isEqual, isFunction, isPlainObject, merge, mergeWith, orderBy, random, union };
export { zipObject };

// LANG ====================================================================================================================================

export const isEmpty = (obj: any) => (Array.isArray(obj) ? obj : Object.keys(obj)).length === 0;
export const toNumber = (v: string): number => +v;

// OBJECT ==================================================================================================================================

export const omit = <O extends object, K extends keyof O>(obj: O, keys: K[]): Omit<O, K> => {
  const res: any = { ...obj };
  for (const key of keys) delete res[key];
  return res;
};

export const pick = <O extends object, K extends keyof O>(obj: O, keys: K[]): Pick<O, K> => {
  if (!obj || !keys) return obj;
  const res: any = {};
  for (const key of keys) res[key] = obj[key];
  return res;
};

export const map = <O extends object, R>(obj: O, mapper: (value: O[keyof O], key: string) => R): R[] =>
  Object.keys(obj).map((k) => mapper(obj[k], k));

export const reduce = <O extends object, R>(obj: O, reducer: (acc: R, value: O[keyof O], key: string) => R, initial: R): R =>
  Object.keys(obj).reduce((acc, k) => reducer(acc, obj[k], k), initial);

export const mapKeys = <O extends object, R extends string>(obj: O, mapper: (v: O[keyof O], k: string) => R): { [P in R]: O[keyof O] } =>
  Object.keys(obj).reduce((acc, k) => ({ ...acc, [mapper(obj[k], k)]: obj[k] }), {} as any);

export const mapValues = <O extends object, R>(obj: O, mapper: (v: O[keyof O], k: string) => R): { [P in keyof O]: R } =>
  Object.keys(obj).reduce((acc, k) => ({ ...acc, [k]: mapper(obj[k], k) }), {} as any);

// ARRAY ===================================================================================================================================

export const difference = <O>(arr1: O[], arr2: O[]): O[] => (arr1 || []).filter((item) => !(arr2 || []).includes(item));
export const intersection = <O>(arr1: O[], arr2: O[]): O[] => (arr1 || []).filter((item) => (arr2 || []).includes(item));

// STRING ==================================================================================================================================

export const endsWith = (str: string, target: string): boolean => (str && target && str.endsWith(target)) || false;
export const lowerFirst = (str: string): string => (str && str.length > 0 ? str.charAt(0).toLowerCase() + str.slice(1) : str);
export const startsWith = (str: string, target: string): boolean => (str && target && str.startsWith(target)) || false;
export const upperCase = (str: string): T.Maybe<string> => (str ? str.toUpperCase() : null);
export const upperFirst = (str: string): string => (str && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str);

// UTIL ====================================================================================================================================

export const identity = (i: any) => i;