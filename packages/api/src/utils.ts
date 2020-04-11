import { getError as baseGetError, map, mergeWith } from '@niama/core';
import gql from 'graphql-tag';

import * as T from './types';

const DEBUG = false;

// LOCAL ===================================================================================================================================

const fieldsForGQL = (fields: T.F): string =>
  Array.isArray(fields)
    ? fields.join()
    : fields !== undefined
    ? Object.keys(fields).reduce(
        (acc, k) => `${acc ? acc + ',' : ''}${k === '_' ? (fields[k] || []).join() : `${k} { ${fieldsForGQL(fields[k])} }`}`,
        ''
      )
    : '';

// FIELDS ==================================================================================================================================

export const idF: T.IdK[] = ['id'];
export const typeF: T.TypeK[] = ['__typename'];
export const poF: T.K[] = [...idF, ...typeF];

export const addDefaultFields = <F extends T.F>({ defaults, fields }: T.AddDefaultFieldsP<F>): F => {
  if (!defaults) return fields;
  if (!fields) return defaults;
  if (Array.isArray(defaults))
    return Array.isArray(fields) ? ([...defaults, ...fields] as F) : { ...fields, _: [...defaults, ...fields['_']] };
  if (Array.isArray(fields)) return { ...defaults, _: [...defaults['_'], ...fields] }
  return mergeWith({}, defaults, fields, (obj, src) => addDefaultFields({ defaults: src, fields: obj }));
};

// OPERATIONS ==============================================================================================================================

const getOp = ({ alias, name, fields, local, rest, selector, type, varTypes }: T.GetOpP): T.DocumentNode => {
  const requestName = name || selector;
  const allArgs = varTypes ? `(${map(varTypes, (v, k) => '$' + k + ':' + v).join()})` : '';
  const itemArgs = varTypes ? `(${map(varTypes, (_, k) => k + ': $' + k).join()})` : '';
  const itemFields = fields ? ' { ' + fieldsForGQL(fields) + ' }' : '';
  const itemLocal = local ? ' @client' : '';
  const itemAlias = alias ? ` @connection(key:"${alias.id}"${alias.args ? `filter:[${alias.args.map((f) => `"${f}"`).join()}]` : ''})` : '';
  const itemRest = rest
    ? ` @rest(type: "${rest.type}", path: "${rest.path}", method: "${rest.method || 'GET'}", bodyKey: "${rest.bodyKey || 'input'}")`
    : '';
  const result = `${type} ${requestName}${allArgs} { ${selector + itemArgs + itemAlias + itemLocal + itemRest + itemFields} }`;
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
