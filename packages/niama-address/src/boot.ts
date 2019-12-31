import { setProvider } from '@niama/core';
import { AsyncSubject } from 'rxjs';

import * as T from '../types';
import AddressSelect from './component.select.quasar-vee.vue';

export function boot({ Vue, ui = 'quasar', ...rest }: T.BootP) {
  setProvider('address', () => ({ service$: new AsyncSubject(), loading: false, ...rest }));
  if (ui === 'quasar') Vue.component('AddressSelect', AddressSelect);
}
