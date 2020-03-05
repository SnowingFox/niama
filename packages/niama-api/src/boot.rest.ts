import { RestLink } from 'apollo-link-rest';

import { getUri, setApiProvider } from './boot.utils';
import * as T from './types';

// BOOT ====================================================================================================================================

export const bootRestApi = ({ opts, secured, ...rest }: T.BootRestApiP = {}): Promise<void> =>
  setApiProvider({ link: getRestLink({ opts, secured }), ...rest });

// REST ====================================================================================================================================

const getRestLink = ({ opts, secured }: T.GetRestLinkP): RestLink => new RestLink({ uri: getUri({ secured, type: 'http' }), ...opts });
