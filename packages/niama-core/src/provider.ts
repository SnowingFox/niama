import { inject, provide } from '@vue/composition-api';

import * as T from '../types';

const symI18n = Symbol('NiamaCoreI18n');
export const provideI18n = (i18n: T.VueI18n) => provide(symI18n, i18n);
export const useI18n = (): T.VueI18n => inject(symI18n) as T.VueI18n;

const symRouter = Symbol('NiamaCoreRouter');
export const provideRouter = (router: T.VueRouter) => provide(symRouter, router);
export const useRouter = (): T.VueRouter => inject(symRouter) as T.VueRouter;
