import { inject, provide } from '@vue/composition-api';
import { defer } from 'rxjs';

import * as T from './types';

const sym = Symbol('NiamaApiClient');

export const provideApi = ($apollo: T.DollarApollo) => {
  $apollo['resetStore'] = () => $apollo.provider.defaultClient.resetStore();
  $apollo['resetStore$'] = defer($apollo['resetStore']);
  provide(sym, $apollo);
};

export const useApi = (): T.Provider => inject(sym) as T.Provider;
