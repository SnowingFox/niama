import { NiamaProvider as BaseNiamaProvider } from '@niama/core/types';

import { Provider } from './main';

export * from '../../types/objects';
export * from '../../types/service';

export interface NiamaProvider extends Omit<BaseNiamaProvider, 'address'> {
  address: Provider;
}
