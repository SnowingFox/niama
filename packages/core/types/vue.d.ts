import { Niama } from './';
import { NiamaOnInit } from './main';

declare module 'vue/types/vue' {
  interface Vue {
    $niamaOnInit?: NiamaOnInit;
    $niama: Niama;
  }
}
