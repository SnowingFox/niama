import { inject, provide } from '@vue/composition-api';

import * as T from './types';

const sym = Symbol('NiamaAuthClient');

export function provideAuth<C extends T.Config>(provider: T.Provider<C>) {
  provide(sym, provider);
}

export function useAuth<C extends T.Config>(): T.Provider<C> {
  return inject(sym) as T.Provider<C>;
}
