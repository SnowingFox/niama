import { HttpLink } from 'apollo-link-http';

import { getUri, setApiProvider } from './boot.utils';
import * as T from './types';

// BOOT ====================================================================================================================================

export const bootHttpApi = ({ opts, secured, ...rest }: T.BootHttpApiP = {}): Promise<void> =>
  setApiProvider({ link: getHttpLink({ opts, secured }), ...rest });

// HTTP ====================================================================================================================================

export const getHttpLink = ({ opts, secured }: T.GetHttpLinkP): HttpLink =>
  new HttpLink({ credentials: 'include', uri: getUri({ secured, type: 'http' }), ...opts });
