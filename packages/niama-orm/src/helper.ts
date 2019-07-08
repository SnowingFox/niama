import { pluralize, upperFirst } from '@niama/core';

import { OrmLabels } from './types';

// LABELS ==================================================================================================================================

export function getLabels<T extends string>(singular: string, other?: Record<T, string>): OrmLabels<T> {
  const Singular = upperFirst(singular);
  const plural = pluralize(singular);
  const Plural = upperFirst(plural);
  return {
    PLURAL: plural,
    SINGULAR: singular,
    CI: `${Singular}CreateInput!`,
    UI: `${Singular}UpdateInput!`,
    WI: `${Singular}WhereInput`,
    WUI: `${Singular}WhereUniqueInput!`,
    COUNT: `${plural}Count`,
    CREATE: `create${Singular}`,
    DELETE: `delete${Singular}`,
    DELETE_MANY: `deleteMany${Plural}`,
    EXISTS: `${singular}Exists`,
    READ: singular,
    READ_ALL: plural,
    READ_MANY: plural,
    UPDATE: `update${Singular}`,
    UPSERT: `upsert${Singular}`,
    ...(other ? other : {}),
  };
}
