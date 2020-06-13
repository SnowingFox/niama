/**
 * @packageDocumentation
 * @module @niama/core
 */

import camelCase from 'lodash-es/camelCase';
import chunk from 'lodash-es/chunk';
import defaultsDeep from 'lodash-es/defaultsDeep';
import defaultTo from 'lodash-es/defaultTo';
import filter from 'lodash-es/filter';
import groupBy from 'lodash-es/groupBy';
import isEqual from 'lodash-es/isEqual';
import isFunction from 'lodash-es/isFunction';
import isPlainObject from 'lodash-es/isPlainObject';
import kebabCase from 'lodash-es/kebabCase';
import merge from 'lodash-es/merge';
import mergeWith from 'lodash-es/mergeWith';
import orderBy from 'lodash-es/orderBy';
import random from 'lodash-es/random';
import union from 'lodash-es/union';
import zipObject from 'lodash-es/zipObject';

import * as T from './typings';

export { camelCase, chunk, defaultsDeep, defaultTo, filter, groupBy, isEqual, isFunction, isPlainObject, kebabCase, merge, mergeWith };
export { orderBy, random, union, zipObject };

// LANG ====================================================================================================================================

export const isEmpty = <T>(obj: T[] | T.Dict): boolean => (Array.isArray(obj) ? obj : Object.keys(obj)).length === 0;
export const toNumber = (v: string): number => +v;

// OBJECT ==================================================================================================================================

export const omit = <O extends T.Dict, K extends keyof O>(obj: O, keys: K[]): Omit<O, K> => {
  const res: O = { ...obj };
  for (const key of keys) delete res[key];
  return res;
};

export const pick = <O extends T.Dict, K extends keyof O>(obj: O, keys: K[]): Pick<O, K> => {
  if (!obj || !keys) return obj;
  const res: Partial<Pick<O,K>> = {};
  for (const key of keys) res[key] = obj[key];
  return res as Pick<O,K>;
};

export const map = <O extends T.Dict, R>(obj: O, mapper: (value: O[keyof O], key: string) => R): R[] =>
  Object.keys(obj).map((k) => mapper(obj[k], k));

export const reduce = <O extends T.Dict, R>(obj: O, reducer: (acc: R, value: O[keyof O], key: string) => R, initial: R): R =>
  Object.keys(obj).reduce((acc, k) => reducer(acc, obj[k], k), initial);

export const mapKeys = <O extends T.Dict, R extends string>(obj: O, mapper: (v: O[keyof O], k: string) => R): { [P in R]: O[keyof O] } =>
  Object.keys(obj).reduce((acc, k) => ({ ...acc, [mapper(obj[k], k)]: obj[k] }), {} as { [P in R]: O[keyof O] });

export const mapValues = <O extends T.Dict, R>(obj: O, mapper: (v: O[keyof O], k: string) => R): { [P in keyof O]: R } =>
  Object.keys(obj).reduce((acc, k) => ({ ...acc, [k]: mapper(obj[k], k) }), {} as { [P in keyof O]: R });

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

export const identity = <T>(i: T): T => i;
