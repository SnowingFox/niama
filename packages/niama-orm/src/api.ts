import { apiDtoF, getMutation, getQuery } from '@niama/api';
import { getCapsD } from '@niama/auth';
import { fill, mapValues, pluralize, upperFirst, zipObject } from '@niama/core';

import * as T from './types';

// LABELS ==================================================================================================================================

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
    READ_MANY: plural,
    READ_ONE: singular,
    UPDATE: `update${Singular}`,
    UPSERT: `upsert${Singular}`,
    ...(other ? other : {}),
  };
}

// FIELDS ==================================================================================================================================

export const capsF: T.Auth.GrantNames[] = ['canDelete', 'canRead', 'canUpdate', 'canUpdateStatus'];
export const statusF: T.NamesStatus[] = ['status'];
export const timeF: T.NamesTime[] = ['createdAt', 'updatedAt'];
export const dtoF: T.F = [...capsF, ...statusF, ...timeF, ...apiDtoF];
export const dtoMinF: T.F = [...capsF, ...statusF, ...apiDtoF];

// DEFAULTS ================================================================================================================================

export function getD<Role extends string = string>(): Pick<T.Vo<Role>, T.NamesD> {
  return { ...getCapsD<Role>(), ...fill(null, 'createdAt', 'updatedAt'), status: 'OK' };
}

export function getDtoD<Role extends string = string>(): Pick<T.Dto<Role>, T.NamesD> {
  return { ...getCapsD<Role>(), ...fill(null, 'createdAt', 'updatedAt'), status: 'OK' };
}

// OPERATIONS===============================================================================================================================

export const ops: T.OpNames[] = ['count', 'create', 'deleteMany', 'deleteOne', 'exists', 'readMany', 'readOne', 'update', 'upsert'];

export function getOps<F extends T.Api.F, E extends string = string>(p: T.GetOpsP<F, E>): T.Ops<F, E> {
  const { extra = {}, fields: f, labels, local = false, rest = false } = p;
  const { CI, COUNT, CREATE, DELETE_ONE, DELETE_MANY, EXISTS, OB, READ_MANY, READ_ONE, TYPE, UI, UPDATE, UPSERT, WI, WUI } = labels;

  const getRest = ({ fragment = '', method = 'GET' }: { fragment?: string; method?: T.Api.OpRestType }): T.Api.OpRest => ({
    type: TYPE,
    path: `/${READ_MANY}${fragment}`,
    method,
  });

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

  return {
    count: getQuery({ selector: COUNT, varTypes: { where: WI }, local, rest: restO.count }),
    create: getMutation({ selector: CREATE, varTypes: { data: CI }, fields: f, local, rest: restO.create }),
    deleteMany: getMutation({ selector: DELETE_MANY, varTypes: { where: WI }, fields: ['count'], local, rest: restO.deleteMany }),
    deleteOne: getMutation({ selector: DELETE_ONE, varTypes: { where: WUI }, fields: ['id'], local, rest: restO.deleteOne }),
    exists: getQuery({ selector: EXISTS, varTypes: { where: WI }, local, rest: restO.exists }),
    readAll: (p = {}) => getQuery({ selector: READ_MANY, fields: p.fields || f, local, rest: restO.readAll }),
    readMany: (p = {}) =>
      getQuery({
        selector: READ_MANY,
        varTypes: { first: 'Int', orderBy: OB, skip: 'Int', where: WI },
        fields: p.fields || f,
        alias: p.alias,
        local,
        rest: restO.readMany,
      }),
    readOne: (p = {}) => getQuery({ selector: READ_ONE, varTypes: { where: WUI }, fields: p.fields || f, local, rest: restO.readOne }),
    update: getMutation({ selector: UPDATE, varTypes: { data: UI, where: WUI }, fields: f, local, rest: restO.update }),
    upsert: getMutation({ selector: UPSERT, varTypes: { create: CI, update: UI, where: WUI }, fields: f, local, rest: restO.upsert }),
    ...extra,
  };
}
