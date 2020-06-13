/**
 * @packageDocumentation
 * @module @niama/core
 */

import VueI18n from 'vue-i18n';

import { setProvider } from './provider';
import * as T from './typings';
import { warn } from './utils';

/**
 * Register a provider for internationalisation.
 *
 * #### Usage
 *
 * Create `src/boot/i18n.ts`:
 *
 * ```ts
 * import { boot } from 'quasar/wrappers';
 *
 * import messages from '@myapp';
 *
 * boot(({ app, Vue }) => bootI18n(app, Vue, { messages, locale: 'fr' }))
 * ```
 *
 * @category Boot
 * @param app
 * @param Vue
 * @param opts
 */
export const bootI18n = (app: T.ComponentOptions<Vue>, Vue: T.VueConstructor, opts: T.I18nO) => {
  const { fallbackLocale = 'en-us', locale = 'en-us', messages, ...rest } = opts;

  if (messages && !messages[locale]) warn(`bootI18n - Provided messages are not defined for the current locale: '${locale}'.`);

  Vue.use(VueI18n);

  const provider = new VueI18n({ ...rest, fallbackLocale, locale, messages, silentFallbackWarn: true });
  app.i18n = provider;
  setProvider('i18n', provider);
};
