import { bootI18n, bootRouter } from '@niama/core';
import { boot } from 'quasar/wrappers';

import messages from '@/hasura-accounts/i18n';

export default boot(async ({ app, router, Vue }) => {
  bootRouter(router);
  await bootI18n({ app, messages, Vue, fallbackLocale: 'fr', locale: 'fr' });
});
