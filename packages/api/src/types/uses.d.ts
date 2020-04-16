import { UseSagaReturnsP } from '@niama/core/types';

import { DocumentNode, UseMutationO } from './externals';

export interface UseMutationP<D, S, F> extends UseSagaReturnsP<D, S, F>, UseMutationO<D, S> {
  mutation: DocumentNode;
}
