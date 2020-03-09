import { Notify } from 'quasar';

import * as T from '../types';
import { getProvider } from './provider';
import { getError } from './utils';

// NOTIFY ==================================================================================================================================

export const notify = (p: T.NotifyP | string) => {
  const { id, type = 'info' } = isNotifyP(p) ? p : { id: p };
  const i18n = getProvider('i18n');
  Notify.create({ type, message: i18n ? (i18n.t(id) as string) : id });
};
export const isNotifyP = (p: T.NotifyP | string): p is T.NotifyP => typeof p !== 'string';

export const notifyDone = (id: string) => notify({ id, type: 'positive' });

export const notifyFail = (error: Error = getError('notifyFail.UndefinedError')) => {
  if (process.env.DEV) console.error('DEBUG -', `${error.name}: ${error.message}`);
  Notify.create({ message: error.message, type: 'negative' });
};
