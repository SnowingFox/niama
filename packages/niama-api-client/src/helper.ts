import { ApiIdNames, ApiRNames, ApiTypeNames } from '@niama/api';
import { Dict, isEmpty, map } from '@niama/core';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

import errors from './content.json';
import { ApiF, ApiRequestO, ApiRequestType } from './types';

const DEBUG = false;

// LOCAL ===================================================================================================================================

const fieldsForGQL = (fields: ApiF): string =>
  Array.isArray(fields)
    ? fields.join()
    : fields !== undefined
    ? Object.keys(fields).reduce(
        (acc, k) => `${acc ? acc + ',' : ''}${k === '_' ? (fields[k] || []).join() : `${k} { ${fieldsForGQL(fields[k])} }`}`,
        ''
      )
    : '';

// FIELDS ==================================================================================================================================

export const idF: ApiIdNames[] = ['id'];
export const typeF: ApiTypeNames[] = ['__typename'];
export const resourceF: ApiRNames[] = [...idF, ...typeF];

// REQUESTS ================================================================================================================================

export function request<F extends ApiF>(type: ApiRequestType, options: ApiRequestO<F>[], name?: string): DocumentNode {
  const requestName: string = name || options[0].selector;
  const allVarTypes: Dict = options.reduce((acc, { varTypes }) => ({ ...acc, ...varTypes }), {});
  const allArgs = !isEmpty(allVarTypes) ? `(${map(allVarTypes, (v, k) => '$' + k + ':' + v).join()})` : '';
  const args = (o: ApiRequestO<F>): string => (o.varTypes ? `(${map(o.varTypes, (_, k) => k + ': $' + k).join()})` : '');
  const fields = (o: ApiRequestO<F>): string => (o.fields ? ' { ' + fieldsForGQL(o.fields) + ' }' : '');
  const connection = (o: ApiRequestO<F>): string => (o.connection ? ` @connection(key:"${o.connection}")` : '');
  const remote = (o: ApiRequestO<F>): string => (o.remote ? '' : ' @client');
  const item = (o: ApiRequestO<F>): string => o.selector + args(o) + connection(o) + remote(o) + fields(o);
  if (DEBUG) console.log(`${type} ${requestName}${allArgs} { ${options.map(item).join('\n')} }`);
  return gql`${type} ${requestName}${allArgs} { ${options.map(item).join('\n')} }`;
}

export function mutation<F extends ApiF>(options: ApiRequestO<F>[], name?: string): DocumentNode {
  return request('mutation', options, name);
}

export function query<F extends ApiF>(options: ApiRequestO<F>[], name?: string): DocumentNode {
  return request('query', options, name);
}

export function subscription<F extends ApiF>(options: ApiRequestO<F>[], name?: string): DocumentNode {
  return request('subscription', options, name);
}

// ERROR HANDLING ==========================================================================================================================

export function getError(error: any) {
  if (error.response) if (error.response.status === 504) return errors[error.response.status];
  return errors.unknown;
}


