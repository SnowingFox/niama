import { endsWith, intersection, upperCase, zipObject } from './lodash';
import { getProvider, hasProvider } from './provider';
import * as T from './typings';

export const getError = (p: T.GetErrorP | string): Error => {
  const { id, type = 'core' } = isGetErrorP(p) ? p : { id: p };
  const $i18n = hasProvider('i18n') ? getProvider('i18n') : null;
  const error = new Error($i18n ? ($i18n.t(`${type}.${id}`) as string) : `${type}.${id}`);
  error.name = `NIAMA ${upperCase(type)} ERROR`;
  return error;
};
export const isGetErrorP = (p: T.GetErrorP | string): p is T.GetErrorP => typeof p !== 'string';

export const fill = <V, K extends string = string>(value: V, ...keys: K[]): Record<K, V> =>
  zipObject<V>(keys, Array(keys.length).fill(value)) as Record<K, V>;

export const pluralize = (singular: string): string =>
  endsWith(singular, 'y') ? `${singular.substr(0, singular.length - 1)}ies` : `${singular}s`;

export const hasIntersection = <V>(arr1: V[], arr2: V[]): boolean => intersection(arr1, arr2).length > 0;
export const i18nizeLabel = <V extends string>(labels: T.I18n<V>, value: V): string => labels[value] || value;

export const i18nizeLabels = <V extends string>(labels: T.I18n<V>, values: V[], defaultValue = ''): string =>
  values && values.length > 0 ? values.map((v) => i18nizeLabel(labels, v)).join(', ') : defaultValue;
