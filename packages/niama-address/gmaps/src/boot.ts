import { AsyncSubject } from 'rxjs';

import * as T from '../types';
import QvAutocomplete from './component.autocomplete.quasar-vee.vue';
import QMap from './component.map.quasar.vue';

export function bootAddress({ Vue, ui = 'quasar', ...rest }: T.BootP) {
  const address: T.Provider = { service$: new AsyncSubject(), ...rest };
  Vue.prototype.$address = address;
  if (ui === 'quasar') {
    Vue.component('QvAutocomplete', QvAutocomplete);
    Vue.component('QMap', QMap);
  }
}
