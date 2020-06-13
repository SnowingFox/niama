/**
 * @packageDocumentation
 * @module @niama/core
 */

import { Notify } from 'quasar';

import { provider } from './provider';
import { coreError } from './utils';

// NOTIFY ==================================================================================================================================

/**
 * Get a translated message from the id and notify the app.
 * @param id message id.
 * @param type type of notification.
 */
export const notify = (id: string, type = 'info') => {
  const i18n = provider('i18n');
  Notify.create({ type, message: i18n ? (i18n.t(id) as string) : id });
};
/**
 * Get a translated message from the id and notify the app with success.
 * @param id message id.
 */
export const notifyDone = (id: string) => notify(id, 'positive');
/**
 * Notify the app with failure.
 * @param err error.
 */
export const notifyFail = (err: Error = coreError('notifyFail.UndefinedError')) => {
  if (process.env.DEV) console.error('DEBUG -', `${err.name}: ${err.message}`);
  Notify.create({ message: err.message, type: 'negative' });
};
