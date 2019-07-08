import { Maybe, upperCase, upperFirst } from '@niama/core';

const getFirstNames = (value: Maybe<string | string[]>, separator = ','): string[] =>
  (typeof value === 'string' ? value.split(separator) : value || []).map((firstName) => upperFirst(firstName.trim()));

const getFirstName = (value: Maybe<string | string[]>, separator = ','): Maybe<string> => {
  const firstNames: string[] = getFirstNames(value, separator);
  return firstNames.length > 0 ? firstNames[0] : null;
};

const getFullName = (firstNames: Maybe<string | string[]>, lastName: Maybe<string>): Maybe<string> => {
  const firstName: Maybe<string> = getFirstName(firstNames);
  return lastName && firstName ? `${upperCase(lastName)} ${firstName}` : null;
};

const getFirstNamesI18n = (value: string[], otherwise = null): Maybe<string> => (value ? value.map(upperFirst).join(', ') : otherwise);

export {
  getFirstName as profileFirstName,
  getFirstNames as profileFirstNames,
  getFullName as profileFullName,
  getFirstNamesI18n as profileFirstNamesI18n,
};
