import { pluralize, upperFirst } from '@niama/core';

import * as T from './types';

export function getLabels<O extends string>({ singular, other }: T.GetLabelsP<O>): T.Labels<O> {
  const Singular = upperFirst(singular);
  const plural = pluralize(singular);
  const Plural = upperFirst(plural);
  return {
    PLURAL: plural,
    SINGULAR: singular,
    TYPE: Singular,
    CI: `${Singular}CreateInput!`,
    UI: `${Singular}UpdateInput!`,
    WI: `Query${Plural}WhereInput`,
    WUI: `${Singular}WhereUniqueInput!`,
    COUNT: `${plural}Count`,
    CREATE: `create${Singular}`,
    DELETE_MANY: `deleteMany${Plural}`,
    DELETE_ONE: `delete${Singular}`,
    EXISTS: `${singular}Exists`,
    OB: `Query${Plural}OrderByInput`,
    READ_MANY: singular,
    READ_ONE: singular,
    UPDATE: `update${Singular}`,
    UPSERT: `upsert${Singular}`,
    ...(other ? other : {}),
  };
}