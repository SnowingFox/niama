import { bootI18n, bootRouter } from '@niama/core';
import { boot } from 'quasar/wrappers';

import messages from '@/<%= pkg.name %>/i18n';

export default boot(({ app, router, Vue }) => {
  bootRouter(router);
  bootI18n({ app, messages, Vue, fallbackLocale: 'fr', locale: 'fr' });
});
