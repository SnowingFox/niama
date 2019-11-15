import { upperCase, upperFirst } from '@niama/core';

import * as T from './types';

const getFirstNames = (value: T.Maybe<string | string[]>, separator = ','): string[] =>
  (typeof value === 'string' ? value.split(separator) : value || []).map((firstName) => upperFirst(firstName.trim()));

const getFirstName = (value: T.Maybe<string | string[]>, separator = ','): T.Maybe<string> => {
  const firstNames: string[] = getFirstNames(value, separator);
  return firstNames.length > 0 ? firstNames[0] : null;
};

const getFullName = (firstNames: T.Maybe<string | string[]>, lastName: T.Maybe<string>): T.Maybe<string> => {
  const firstName: T.Maybe<string> = getFirstName(firstNames);
  return lastName && firstName ? `${upperCase(lastName)} ${firstName}` : null;
};

const getFirstNamesI18n = (value: string[], otherwise = null): T.Maybe<string> => (value ? value.map(upperFirst).join(', ') : otherwise);

export {
  getFirstName as profileFirstName,
  getFirstNames as profileFirstNames,
  getFullName as profileFullName,
  getFirstNamesI18n as profileFirstNamesI18n,
};
