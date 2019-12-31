import { VueI18n, VueRouter } from './externals';

export * from './externals';
export * from './main';
export * from './rx';
export * from './ui';
export * from './uses';
export * from './vue';

declare module '@niama/core/types' {
  interface Niama {
    i18n: VueI18n;
    router: VueRouter;
  }
}