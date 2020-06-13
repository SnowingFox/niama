/**
 * @packageDocumentation
 * @module @niama/core
 */

import { VueRouter } from '@niama/core/types';
import { reactive } from '@vue/composition-api';

import { setProvider } from './provider';

/**
 * Register a provider for routing.
 *
 * #### Usage
 *
 * Create `src/boot/router.ts`:
 *
 * ```ts
 * import { boot } from 'quasar/wrappers';
 *
 * boot(({ router }) => bootRouter(router));
 * ```
 *
 * @category Boot
 * @param router Vue Router instance
 */
export const bootRouter = (router: VueRouter) => {
  setProvider('router', reactive(router) as VueRouter);
};
