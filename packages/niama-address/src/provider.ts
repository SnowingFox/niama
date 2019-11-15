/*import { inject, provide } from '@vue/composition-api';
import { BehaviorSubject } from 'rxjs';

import { getApiUrl } from './helper';
import * as T from './types';

const sym = Symbol('NiamaAddressClient');

export const provideAddress = (provider: T.Provider) => {
  const load = () => {
    const script: HTMLScriptElement = document.createElement('script');
    const attrs = { src: getApiUrl({ $niama: { address: provider }, callback: 'niamaLoaded' }), async: true, defer: true };
    for (const key in attrs) script.setAttribute(key, attrs[key]);
    document.body.appendChild(script);
  };

  if (window !== undefined)
    window['niamaLoaded'] = () => {
      provider.service$.next((window['google'].maps as any) as T.Service);
      provider.service$.complete();
    };

  provide(sym, { ...provider, load, loading$: new BehaviorSubject(false) });
};

export const useAddress = (): T.Provider => {
  const { load, loading$, service$, ...p } = inject(sym) as T.Provider & { load: Function; loading$: BehaviorSubject<boolean> };
  if (!loading$.value) {
    loading$.next(true);
    load();
  }
  return { service$, ...p };
};*/
