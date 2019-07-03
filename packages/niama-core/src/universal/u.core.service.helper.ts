import { struct } from 'superstruct';

import { endsWith, intersection, zipObject } from './u.core.service.helper.lodash';

// EXTRA ===================================================================================================================================

export function fill<T, O extends { [i: string]: any }, K extends keyof O>(value: T, ...keys: K[]): Record<K, T> {
  return zipObject<T>(keys, Array(keys.length).fill(value)) as Record<K, T>;
}

/*export function fillBU<T, K extends string>(value: T, ...keys: K[]): Record<K, T> {
  return zipObject<T>(keys, Array(keys.length).fill(value)) as Record<K, T>;
}*/

export const pluralize = (singular: string): string =>
  endsWith(singular, 'y') ? `${singular.substr(0, singular.length - 1)}ies` : `${singular}s`;

export function hasIntersection<T>(arr1: T[], arr2: T[]): boolean {
  return intersection(arr1, arr2).length > 0;
}

export function i18nizeLabel<T extends string>(labels: N.I18n<T>, value: T): string {
  return labels[value] || value;
}

export function i18nizeLabels<T extends string>(labels: N.I18n<T>, values: T[], defaultValue = ''): string {
  return values && values.length > 0 ? values.map((v) => i18nizeLabel(labels, v)).join(', ') : defaultValue;
}

// STRUCT ==================================================================================================================================

export function maybe<T>(value: T): N.Kind {
  return struct.union([value, 'null']);
}
