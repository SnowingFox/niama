import * as T from '../types';
import { endsWith, intersection, zipObject } from './lodash';

export function fill<V, O extends { [i: string]: any }, K extends keyof O>(value: V, ...keys: K[]): Record<K, V> {
  return zipObject<V>(keys, Array(keys.length).fill(value)) as Record<K, V>;
}

export const pluralize = (singular: string): string =>
  endsWith(singular, 'y') ? `${singular.substr(0, singular.length - 1)}ies` : `${singular}s`;

export function hasIntersection<V>(arr1: V[], arr2: V[]): boolean {
  return intersection(arr1, arr2).length > 0;
}

export function i18nizeLabel<V extends string>(labels: T.I18n<V>, value: V): string {
  return labels[value] || value;
}

export function i18nizeLabels<V extends string>(labels: T.I18n<V>, values: V[], defaultValue = ''): string {
  return values && values.length > 0 ? values.map((v) => i18nizeLabel(labels, v)).join(', ') : defaultValue;
}
