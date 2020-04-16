import { getError as baseGetError, map, mergeWith } from '@niama/core';
import gql from 'graphql-tag';

import * as T from './typings';

const DEBUG = false;

// LOCAL ===================================================================================================================================

const reduceFieldsForGQL = (fields: T.F) => (result: string, key: string): string =>
  `${result ? result + ',' : ''}${key === '_' ? (fields[key] || []).join() : `${key} { ${fieldsForGQL(fields[key])} }`}`;

const fieldsForGQL = (fields: T.F): string => {
  if (Array.isArray(fields)) return fields.join();
  return fields !== undefined ? Object.keys(fields).reduce(reduceFieldsForGQL(fields), '') : '';
};

// FIELDS ==================================================================================================================================

export const idF: T.IdK[] = ['id'];
export const typeF: T.TypeK[] = ['__typename'];
export const poF: T.K[] = [...idF, ...typeF];

const addComplexDefaultFields = <F extends T.F>({ defaults, fields }: T.AddDefaultFieldsP<F>): F =>
  Array.isArray(fields)
    ? { ...defaults, _: [...defaults['_'], ...fields] }
    : mergeWith({}, defaults, fields, (obj, src) => addDefaultFields({ defaults: src, fields: obj }));

const addSimpleDefaultFields = <F extends T.F>({ defaults, fields }: T.AddSimpleDefaultFieldsP<F>): F =>
  Array.isArray(fields) ? ([...defaults, ...fields] as F) : { ...fields, _: [...defaults, ...fields['_']] };

export const addDefaultFields = <F extends T.F>({ defaults, fields }: T.AddDefaultFieldsP<F>): F => {
  if (!defaults) return fields;
  if (!fields) return defaults;
  return Array.isArray(defaults) ? addSimpleDefaultFields({defaults, fields}) : addComplexDefaultFields({defaults, fields});
};

// OPERATIONS ==============================================================================================================================

const getOpAllArgs = (varTypes?: T.Dict<string>): string => (varTypes ? `(${map(varTypes, (v, k) => '$' + k + ':' + v).join()})` : '');

const getOpItemAlias = (a?: T.OpAlias): string =>
  a ? ` @connection(key:"${a.id}"${a.args ? `filter:[${a.args.map((f) => `"${f}"`).join()}]` : ''})` : '';

const getOpItemArgs = (varTypes?: T.Dict<string>): string => (varTypes ? `(${map(varTypes, (_, k) => k + ': $' + k).join()})` : '');

const getOpItemFields = (f?: T.F): string => (f ? ' { ' + fieldsForGQL(f) + ' }' : '');

const getOpItemRest = (r?: T.OpRest): string =>
  r ? ` @rest(type: "${r.type}", path: "${r.path}", method: "${r.method || 'GET'}", bodyKey: "${r.bodyKey || 'input'}")` : '';

const getOpString = (p: T.GetOpP): string => {
  const { alias, name, fields, local, rest, selector, type, varTypes } = p;
  return `${type} ${name || selector}${getOpAllArgs(varTypes)} { ${
    selector + getOpItemArgs(varTypes) + getOpItemAlias(alias) + local ? ' @client' : '' + getOpItemRest(rest) + getOpItemFields(fields)
  } }`;
};

const getOp = (p: T.GetOpP): T.DocumentNode => {
  const result = getOpString(p);
  if (DEBUG) console.log(result);
  return gql`
    ${result}
  `;
};

export const getMutation = (p: T.GetTypedOpP): T.DocumentNode => getOp({ ...p, type: 'mutation' });
export const getQuery = (p: T.GetTypedOpP): T.DocumentNode => getOp({ ...p, type: 'query' });
export const getSubscription = (p: T.GetTypedOpP): T.DocumentNode => getOp({ ...p, type: 'subscription' });

// ERROR ===================================================================================================================================

export const getError = (id: string): Error => baseGetError({ id, type: 'api' });
