import { getMutation, getQuery } from '@niama/api';
import { mapValues, pluralize, upperFirst } from '@niama/core';
import { isGetDocumentNodeP, isGetLabelsP } from '@niama/orm';

import * as T from './types';

export function getLabels<C extends T.Cfg>(p: T.GetLabelsP<C> | string): T.Labels<C> {
  const { extra = undefined, singular } = isGetLabelsP(p) ? p : { singular: p };
  const Singular = upperFirst(singular);
  const plural = pluralize(singular);
  const Plural = upperFirst(plural);
  return {
    plural,
    singular,
    type: Singular,
    createI: `${Singular}CreateInput!`,
    updateI: `${Singular}UpdateInput!`,
    whereI: `Query${Plural}WhereInput`,
    whereUI: `${singular}_bool_exp`, //`${Singular}WhereUniqueInput!`,
    count: `${plural}Count`,
    create: `create${Singular}`,
    deleteMany: `deleteMany${Plural}`,
    deleteOne: `delete${Singular}`,
    exists: `${singular}Exists`,
    orderBy: `${singular}_order_by!`, // `Query${Plural}OrderByInput`,
    readMany: singular,
    readOne: singular,
    update: `update${Singular}`,
    upsert: `upsert${Singular}`,
    ...(extra ?? {}),
  } as T.Labels<C>;
}

export function getOps<C extends T.Cfg>(p: T.GetOpsP<C>): T.Ops<C> {
  const { extra, F, L, local = false } = p;

  const documents: Record<C['OpC']['ED'] | T.OpDK, T.Api.GetOpP> = {
    ...((extra && extra['docs']) || {}),
    count: { type: 'query', selector: L.count, varTypes: { where: L.whereI }, local },
    deleteMany: {
      type: 'mutation',
      selector: L.deleteMany,
      varTypes: { where: L.whereI },
      fields: ['count'],
      local,
    },
    deleteOne: { type: 'mutation', selector: L.deleteOne, varTypes: { where: L.whereUI }, fields: ['id'], local },
    exists: { type: 'query', selector: L.exists, varTypes: { where: L.whereI }, local },
  } as Record<C['OpC']['ED'] | T.OpDK, T.Api.GetOpP>;

  const factories: Record<C['OpC']['EF'] | T.OpFK, T.Api.GetOpP> = {
    ...((extra && extra['factories']) || {}),
    create: { type: 'mutation', selector: L.create, varTypes: { data: L.createI }, local },
    readAll: { type: 'query', selector: L.readMany, local },
    readMany: {
      type: 'query',
      selector: L.readMany,
      varTypes: { limit: 'Int', offset: 'Int', where: L.whereUI },
      local,
    },
    readOne: { type: 'query', selector: L.readOne, varTypes: { where: L.whereUI }, local },
    update: { type: 'mutation', selector: L.update, varTypes: { data: L.updateI, where: L.whereUI }, local },
    upsert: {
      type: 'mutation',
      selector: L.upsert,
      varTypes: { create: L.createI, update: L.updateI, where: L.whereUI },
      local,
    },
  } as Record<C['OpC']['EF'] | T.OpFK, T.Api.GetOpP>;

  return {
    ...mapValues(documents, ({ type, ...rest }) => (type === 'query' ? getQuery(rest) : getMutation(rest))),
    ...mapValues(factories, ({ type, ...rest }) => (p?: T.GetDocumentNodeP<C['FiC']['F']> | C['FiC']['F']) => {
      const opts = p && isGetDocumentNodeP(p) ? { ...p, fields: p.fields ?? F.main } : { fields: p ?? F.main };
      return type === 'query' ? getQuery({ ...rest, ...opts }) : getMutation({ ...rest, ...opts });
    }),
  } as T.Ops<C>;
}

export const getRp = <C extends T.Cfg, ToExclude extends T.Opt<string> = undefined>(p: T.GetRpP<C, ToExclude>): T.Rp<C> => {
  const { extra, F, singular, ...rest } = p;
  const extraL = mapValues({ ...((extra && extra['docs']) || {}), ...((extra && extra['factories']) || {}) }, ({ selector }) => selector);
  const L: T.Labels<C> = getLabels({ singular, extra: extraL } as T.GetLabelsP<C>);
  const O: T.Ops<C> = getOps(({ extra, F, L, ...rest } as unknown) as T.GetOpsP<C>);
  return { F, L, O };
};
