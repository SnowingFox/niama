import { inject, provide } from '@vue/composition-api';
import Vue from 'vue';

import * as T from '../types';
import { getError } from './utils';

// PROVIDER ================================================================================================================================

const sym = Symbol('Niama');

export const provideNiama = ({ root: { $niama, $niamaOnInit } }: T.SetupContext) => {
  ($niamaOnInit || []).forEach((onInit) => onInit());
  delete Vue.prototype.$niamaInit;
  provide(sym, $niama || {});
};

export const useNiama = (): T.Niama => inject(sym) as T.Niama;

// UTILS ==================================================================================================================================

export const getNiama = (): T.Niama => Vue.prototype.$niama;

export function getProvider<K extends T.NiamaKeys>(id: K): T.Niama[K] {
  if (!hasProvider(id)) throw getError('getProvider.undefined');
  return Vue.prototype.$niama[id];
}

export function hasProvider<K extends T.NiamaKeys>(id: K): boolean {
  return Vue.prototype.$niama && !!Vue.prototype.$niama[id];
}

export function hasProviders(ids: T.NiamaKeys[]): boolean {
  return ids.every(hasProvider);
}

export function setProvider<K extends T.NiamaKeys>({ id, onInit, provider }: T.NiamaProviderInit<K>) {
  if (!Vue.prototype.$niama) Vue.prototype.$niama = {};
  if (!Vue.prototype.$niamaOnInit) Vue.prototype.$niamaOnInit = [];
  Vue.prototype.$niama[id] = provider;
  if (onInit) Vue.prototype.$niamaOnInit.push(onInit);
}
