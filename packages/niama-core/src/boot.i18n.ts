import VueI18n from 'vue-i18n';

import * as T from '../types';
import { setProvider } from './provider';

export const bootI18n = async (p: T.BootI18nP) => {
  const { app, fallbackLocale = 'en-us', locale = 'en-us', Vue, ...rest } = p;

  Vue.use(VueI18n);

  const provider = new VueI18n({ ...rest, fallbackLocale, locale, silentFallbackWarn: true });
  app.i18n = provider;
  setProvider({ id: 'i18n', provider });
};
