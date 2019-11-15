import { NiamaProvider as BaseNiamaProvider } from '@niama/core/types';

import { Provider } from './main';

export interface NiamaProvider extends Omit<BaseNiamaProvider, 'address'> {
  address: Provider;
}
