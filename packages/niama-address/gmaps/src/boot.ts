import { boot as baseBoot } from '../../src/boot';
import * as T from '../types';
import AddressMapSelect from './component.map-select.quasar.vue';
import AddressMap from './component.map.quasar.vue';

export const boot = ({ Vue, ui = 'quasar', ...rest }: T.BootP) => {
  baseBoot({ Vue, ui, ...rest });
  if (ui === 'quasar') {
    Vue.component('AddressMap', AddressMap);
    Vue.component('AddressMapSelect', AddressMapSelect);
  }
};
