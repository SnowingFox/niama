
import { WebSocketLink } from 'apollo-link-ws';

import { getUri, setApiProvider } from './boot.utils';
import * as T from './types';

// BOOT ====================================================================================================================================

export const bootWsApi = ({ opts, ...rest }: T.BootWsApiP = {}): Promise<void> => setApiProvider({ link: getWsLink(opts), ...rest });

// WS ======================================================================================================================================

export const getWsLink = (opts?: T.WebSocketLinkO): WebSocketLink =>
  new WebSocketLink({ ...opts, options: { reconnect: true, ...opts?.options }, uri: opts?.uri ?? getUri({ type: 'ws' }) });
