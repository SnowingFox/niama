import { Notify } from 'quasar';

import * as T from '../types';

// NOTIFY ==================================================================================================================================

export const notify = ({ $niama, classes, icon, messageId }: T.NotifyP): Function =>
  Notify.create({ classes, icon, message: $niama.i18n.t(messageId) as string });

export const notifyError = (p: T.NotifyP): Function =>
  notify({ icon: 'fas fa-exclamation-triangle', classes: 'q-notification--error', ...p });

export const notifySuccess = (p: T.NotifyP): Function => notify({ icon: 'fas fa-check-circle', classes: 'q-notification--success', ...p });
