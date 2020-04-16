import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import { getHttpLink } from './boot.http';
import { setApiProvider } from './boot.utils';
import { getWsLink } from './boot.ws';
import * as T from './typings';

// BOOT ====================================================================================================================================

export const bootApi = async (p: T.BootApiP = {}): Promise<void> => {
  const { http, secured = false, ws, ...rest } = p;
  const splitter = ({ query }): boolean => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  };
  await setApiProvider({ link: split(splitter, getWsLink(ws), getHttpLink({ secured, opts: http })), ...rest });
};
