import { getMutation, getQuery } from '@niama/api';
import { mapValues, pluralize, upperFirst, zipObject } from '@niama/core';

import * as T from './typings';
import { isGetDocumentNodeP } from './utils';

// LABELS ==================================================================================================================================

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
    whereUI: `${Singular}WhereUniqueInput!`,
    count: `${plural}Count`,
    create: `create${Singular}`,
    deleteMany: `deleteMany${Plural}`,
    deleteOne: `delete${Singular}`,
    exists: `${singular}Exists`,
    orderBy: `Query${Plural}OrderByInput`,
    readMany: plural,
    readOne: singular,
    update: `update${Singular}`,
    upsert: `upsert${Singular}`,
    ...(extra ?? {}),
  } as T.Labels<C>;
}
export const isGetLabelsP = <C extends T.Cfg>(p: T.GetLabelsP<C> | string): p is T.GetLabelsP<C> => typeof p !== 'string';

// OPERATIONS===============================================================================================================================

export const ops: T.OpK[] = ['count', 'create', 'deleteMany', 'deleteOne', 'exists', 'readMany', 'readOne', 'update', 'upsert'];

export function getOps<C extends T.Cfg>(p: T.GetOpsP<C>): T.Ops<C> {
  const { extra, F, L, local = false, rest = false } = p;

  type GetRestP = { bodyKey?: string; fragment?: string; method?: T.Api.OpRestType };
  const getRest = ({ bodyKey = 'data', fragment = '', method = 'GET' }: GetRestP): T.Api.OpRest => {
    return { bodyKey, method, path: `/${L.readMany}${fragment}`, type: L.type };
  };

  const restD = {
    count: getRest({ fragment: '?{args.where}&_limit=0' }),
    create: getRest({ method: 'POST' }),
    deleteMany: getRest({ method: 'DELETE' }),
    deleteOne: getRest({ fragment: '/{args.where.id}', method: 'DELETE' }),
    exists: getRest({}),
    readAll: getRest({}),
    readMany: getRest({ fragment: '?_limit={args.first}&_start={args.skip}' }),
    readOne: getRest({ fragment: '/{args.where.id}' }),
    update: getRest({}),
    upsert: getRest({}),
  };

  const restO = !rest
    ? zipObject(ops, new Array(ops.length).fill(null))
    : typeof rest === 'boolean'
    ? restD
    : { ...restD, ...mapValues(rest, (v, k) => ({ ...restD[k], ...(typeof v === 'string' ? { path: v } : v) })) };

  const documents: Record<C['OpC']['ED'] | T.OpDK, T.Api.GetOpP> = {
    ...((extra && extra['docs']) || {}),
    count: { type: 'query', selector: L.count, varTypes: { where: L.whereI }, local, rest: restO.count },
    deleteMany: {
      type: 'mutation',
      selector: L.deleteMany,
      varTypes: { where: L.whereI },
      fields: ['count'],
      local,
      rest: restO.deleteMany,
    },
    deleteOne: { type: 'mutation', selector: L.deleteOne, varTypes: { where: L.whereUI }, fields: ['id'], local, rest: restO.deleteOne },
    exists: { type: 'query', selector: L.exists, varTypes: { where: L.whereI }, local, rest: restO.exists },
  } as Record<C['OpC']['ED'] | T.OpDK, T.Api.GetOpP>;

  const factories: Record<C['OpC']['EF'] | T.OpFK, T.Api.GetOpP> = {
    ...((extra && extra['factories']) || {}),
    create: { type: 'mutation', selector: L.create, varTypes: { data: L.createI }, local, rest: restO.create },
    readAll: { type: 'query', selector: L.readMany, local, rest: restO.readAll },
    readMany: {
      type: 'query',
      selector: L.readMany,
      varTypes: { first: 'Int', orderBy: L.orderBy, skip: 'Int', where: L.whereUI },
      local,
      rest: restO.readMany,
    },
    readOne: { type: 'query', selector: L.readOne, varTypes: { where: L.whereUI }, local, rest: restO.readOne },
    update: { type: 'mutation', selector: L.update, varTypes: { data: L.updateI, where: L.whereUI }, local, rest: restO.update },
    upsert: {
      type: 'mutation',
      selector: L.upsert,
      varTypes: { create: L.createI, update: L.updateI, where: L.whereUI },
      local,
      rest: restO.upsert,
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

// REPO ====================================================================================================================================

export const getRp = <C extends T.Cfg, ToExclude extends T.Opt<string> = undefined>(p: T.GetRpP<C, ToExclude>): T.Rp<C> => {
  const { extra, F, singular, ...rest } = p;
  const extraL = mapValues({ ...((extra && extra['docs']) || {}), ...((extra && extra['factories']) || {}) }, ({ selector }) => selector);
  const L: T.Labels<C> = getLabels({ singular, extra: extraL } as T.GetLabelsP<C>);
  const O: T.Ops<C> = getOps(({ extra, F, L, ...rest } as unknown) as T.GetOpsP<C>);
  return { F, L, O };
};