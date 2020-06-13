/**
 * @packageDocumentation
 * @module @niama/core
 */

import { inject, provide } from '@vue/composition-api';
import Vue from 'vue';

import * as T from './typings';
import { coreError } from './utils';

// PROVIDER ================================================================================================================================

const sym = Symbol('Niama');
/**
 * Provide Niama to the app.
 * @param ctx Setup context.
 */
export const provideNiama = (ctx: T.SetupContext) => {
  const { $niama, $niamaOnInit } = ctx.root;
  if (!hasProvider('i18n')) throw coreError('I18n is not provided.');
  if (!hasProvider('router')) throw coreError('provideNiama.UndefinedProviderRouter');
  ($niamaOnInit || []).forEach((onInit) => onInit());
  delete Vue.prototype.$niamaInit;
  provide(sym, $niama || {});
};
/**
 * Use Niama.
 * @returns Niama.
 */
export const useNiama = (): T.Niama => inject(sym) as T.Niama;

// UTILS ==================================================================================================================================

/**
 * Get a provider from its id.
 * @param id provider id.
 * @returns provider.
 */
export const provider = <K extends T.NiamaKeys>(id: K): T.Niama[K] => {
  if (!hasProvider(id)) throw coreError(id === 'i18n' ? 'I18n is not provided.' : 'getProvider.Undefined', { id });
  return Vue.prototype.$niama[id];
}
/**
 * Check provider existence from an id.
 * @param id provider id.
 * @returns existence of the provider.
 */
export const hasProvider = <K extends T.NiamaKeys>(id: K): boolean => Vue.prototype.$niama && !!Vue.prototype.$niama[id];
/**
 * Check providers existence from ids.
 * @param ids provider ids.
 * @returns existence of all providers.
 */
export const hasProviders = (ids: T.NiamaKeys[]): boolean => ids.every(hasProvider);
/**
 * Set provider.
 * @param id provider id.
 * @param provider provider. 
 * @param onInit initialisation hook. 
 */
export const setProvider = <K extends T.NiamaKeys>(id: K, provider: T.Niama[K], onInit?: T.Syncer<void>) => {
  if (!Vue.prototype.$niama) Vue.prototype.$niama = {};
  if (!Vue.prototype.$niamaOnInit) Vue.prototype.$niamaOnInit = [];
  Vue.prototype.$niama[id] = provider;
  if (onInit) (Vue.prototype.$niamaOnInit as T.NiamaOnInit).push(onInit);
}
