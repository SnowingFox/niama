import VueI18n from 'vue-i18n';

import { setProvider } from './provider';
import * as T from './typings';

export const bootI18n = (p: T.BootI18nP) => {
  const { app, fallbackLocale = 'en-us', locale = 'en-us', Vue, ...rest } = p;

  Vue.use(VueI18n);

  const provider = new VueI18n({ ...rest, fallbackLocale, locale, silentFallbackWarn: true });
  app.i18n = provider;
  setProvider({ id: 'i18n', provider });
};
