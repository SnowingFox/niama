import VueI18n from 'vue-i18n';

import menus from '../assets/data/menus.json';

export default async ({ app, Vue }) => {
  Vue.use(VueI18n);

  app.i18n = new VueI18n({
    locale: 'fr',
    fallbackLocale: 'fr',
    messages: { fr: { menus } },
    silentFallbackWarn: true,
  });
};
