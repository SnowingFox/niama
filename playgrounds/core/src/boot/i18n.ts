import { bootI18n } from '@niama/core';
import { boot } from 'quasar/wrappers';

import messages from '@/@niama/playground/i18n';

export default boot(({ app, Vue }) => bootI18n({ app, messages, Vue }));
