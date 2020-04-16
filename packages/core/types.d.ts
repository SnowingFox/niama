import { Niama } from '@niama/core/types';

import { VueI18n, VueRouter } from './src/types/externals';
import { NiamaOnInit } from './src/types/main';

export * from './src/types';

declare module '@niama/core/types' {
  export interface Niama {
    i18n: VueI18n;
    router: VueRouter;
    storage: any;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $niamaOnInit?: NiamaOnInit;
    $niama: Niama;
  }
}
