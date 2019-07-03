import { isEmpty, map } from '@niama/core';
import gql from 'graphql-tag';

import errors from '../universal/u.api.content.json';

const DEBUG = false;

// LOCAL ===================================================================================================================================

const fieldsForGQL = (fields: N.ApiF): string =>
  Array.isArray(fields)
    ? fields.join()
    : fields !== undefined
    ? Object.keys(fields).reduce(
        (acc, k) => `${acc ? acc + ',' : ''}${k === '_' ? (fields[k] || []).join() : `${k} { ${fieldsForGQL(fields[k])} }`}`,
        ''
      )
    : '';

// FIELDS ==================================================================================================================================

export const idF: N.ApiIdFNames[] = ['id'];
export const typeF: N.ApiTypeFNames[] = ['__typename'];
export const resourceF: N.ApiRFNames[] = [...idF, ...typeF];

// REQUESTS ================================================================================================================================

export function request<F extends N.ApiF>(type: N.ApiRequestType, options: N.ApiRequestO<F>[], name?: string): N.DocumentNode {
  const requestName: string = name || options[0].selector;
  const allVarTypes: N.Dict = options.reduce((acc, { varTypes }) => ({ ...acc, ...varTypes }), {});
  const allArgs = !isEmpty(allVarTypes) ? `(${map(allVarTypes, (v, k) => '$' + k + ':' + v).join()})` : '';
  const args = (o: N.ApiRequestO<F>): string => (o.varTypes ? `(${map(o.varTypes, (_, k) => k + ': $' + k).join()})` : '');
  const fields = (o: N.ApiRequestO<F>): string => (o.fields ? ' { ' + fieldsForGQL(o.fields) + ' }' : '');
  const connection = (o: N.ApiRequestO<F>): string => (o.connection ? ` @connection(key:"${o.connection}")` : '');
  const remote = (o: N.ApiRequestO<F>): string => (o.remote ? '' : ' @client');
  const item = (o: N.ApiRequestO<F>): string => o.selector + args(o) + connection(o) + remote(o) + fields(o);
  if (DEBUG) console.log(`${type} ${requestName}${allArgs} { ${options.map(item).join('\n')} }`);
  return gql`${type} ${requestName}${allArgs} { ${options.map(item).join('\n')} }`;
}

export function mutation<F extends N.ApiF>(options: N.ApiRequestO<F>[], name?: string): N.DocumentNode {
  return request('mutation', options, name);
}

export function query<F extends N.ApiF>(options: N.ApiRequestO<F>[], name?: string): N.DocumentNode {
  return request('query', options, name);
}

export function subscription<F extends N.ApiF>(options: N.ApiRequestO<F>[], name?: string): N.DocumentNode {
  return request('subscription', options, name);
}

// ERROR HANDLING ==========================================================================================================================

export function getError(error: N.AxiosError) {
  if (error.response) if (error.response.status === 504) return errors[error.response.status];
  return errors.unknown;
}


