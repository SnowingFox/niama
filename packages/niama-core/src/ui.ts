import { Notify } from 'quasar';

import * as T from '../types';
import { getProvider } from './provider';
import { getError } from './utils';

// NOTIFY ==================================================================================================================================

export const notify = (p: T.NotifyP | string) => {
  const { classes = undefined, icon = undefined, id } = isNotifyP(p) ? p : { id: p };
  const i18n = getProvider('i18n');
  Notify.create({ classes, icon, message: i18n ? (i18n.t(id) as string) : id });
};
export const isNotifyP = (p: T.NotifyP | string): p is T.NotifyP => (p as T.NotifyP).id !== undefined;

export const notifyDone = (p: T.NotifyP | string) => {
  const { classes = 'q-notification--done', icon = 'fas fa-check-circle', id } = isNotifyP(p) ? p : { id: p };
  notify({ classes, icon, id });
};

export const notifyFail = (p: T.NotifyFailP | Error) => {
  const { classes = 'q-notification--fail', icon = 'warning', error = getError('notifyFail.ERROR_UNDEFINED') } = isNotifyFailP(p)
    ? p
    : { error: p };
  if (process.env.DEV) console.error('DEBUG -', `${error.name}: ${error.message}`);
  Notify.create({ classes, icon, message: error.message });
};
export const isNotifyFailP = (p: T.NotifyFailP | Error): p is T.NotifyFailP => (p as T.NotifyFailP).error !== undefined;
