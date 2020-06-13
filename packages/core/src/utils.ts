/**
 * @packageDocumentation
 * @module @niama/core
 */

import { endsWith, intersection, zipObject } from './lodash';
import { hasProvider, provider } from './provider';
import * as T from './typings';

export const errorer = (pkg: string, prefix: string): T.Errorer => (id, scope) => {
  const $i18n = hasProvider('i18n') ? provider('i18n') : null;
  const error = new Error($i18n ? ($i18n.t(`${prefix}.${id}`, scope) as string) : id);
  error.name = `[${pkg}]`;
  return error;
};
/**
 * Get internationalized error object from `id`.
 * @param id
 */
export const coreError: T.Errorer = errorer('@niama/core', 'core');
/**
 *
 * @param value
 * @param keys
 */
export const fill = <V, K extends string = string>(value: V, ...keys: K[]): Record<K, V> =>
  zipObject<V>(keys, Array(keys.length).fill(value)) as Record<K, V>;
/**
 *
 * @param singular
 */
export const pluralize = (singular: string): string =>
  endsWith(singular, 'y') ? `${singular.substr(0, singular.length - 1)}ies` : `${singular}s`;
/**
 *
 * @param arr1
 * @param arr2
 */
export const hasIntersection = <V>(arr1: V[], arr2: V[]): boolean => intersection(arr1, arr2).length > 0;
/**
 * Send an internationalized warning from `id` on the console in development mode.
 * @param id
 * @param type
 */
export const warn = (id: string, type = 'core') => {
  const $i18n = hasProvider('i18n') ? provider('i18n') : null;
  const message = $i18n ? ($i18n.t(`${type}.${id}`) as string) : id;
  if (process.env.DEV) console.warn(`[@niama/${type}] ${message}`);
};
