import Vue from 'vue';
import VueI18n from 'vue-i18n';

import messages from '@/hasura-accounts/i18n';

Vue.use(VueI18n);

export default ({ app }) => (app.i18n = new VueI18n({ messages, fallbackLocale: 'fr', locale: 'fr', silentFallbackWarn: true }));
