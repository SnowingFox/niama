import { inject, provide } from '@vue/composition-api';
import Vue from 'vue';

import * as T from '../types';

// PROVIDER ================================================================================================================================

const sym = Symbol('Niama');

export const provideNiama = ({ root: { $i18n: i18n, $niama, $niamaOnInit, $router: router } }: T.SetupContext) => {
  setProvider({ id: 'i18n', provider: i18n });
  setProvider({ id: 'router', provider: router });
  $niama = { ...($niama || {}), i18n, router };
  ($niamaOnInit || []).forEach((onInit) => onInit());
  delete Vue.prototype.$niamaInit;
  provide(sym, $niama);
};

export const useNiama = (): T.Niama => inject(sym) as T.Niama;

// UTILS ==================================================================================================================================

export function getNiama(): T.Niama {
  return Vue.prototype.$niama;
}

export function getProvider<K extends T.NiamaKeys>(id: K): T.Maybe<T.Niama[K]> {
  return Vue.prototype.$niama ? Vue.prototype.$niama[id] || null : null;
}

export function hasProvider<K extends T.NiamaKeys>(id: K): boolean {
  return Vue.prototype.$niama && Vue.prototype.$niama[id];
}

export const hasProviders = (ids: T.NiamaKeys[]): boolean => ids.every(hasProvider);

export function setProvider<K extends T.NiamaKeys>({ id, onInit, provider }: T.NiamaProviderInit<K>) {
  if (!Vue.prototype.$niama) Vue.prototype.$niama = {};
  if (!Vue.prototype.$niamaOnInit) Vue.prototype.$niamaOnInit = [];
  Vue.prototype.$niama[id] = provider;
  if (onInit) Vue.prototype.$niamaOnInit.push(onInit);
}
