import { saga$, useSagaReturns } from '@niama/core';
import { useMutation as useApolloMutation } from '@vue/apollo-composable';

import { getError, getMutation } from './helper';
import * as T from './types';

export function useMutation<D, S, F>(p: T.GetTypedOpP | T.UseMutationP<D, S, F>): T.Observabler<D | F, S> {
  const { mutation, ...rest }: T.UseMutationP<D, S, F> = isUseMutationP(p) ? p : { mutation: getMutation(p) };
  const { mutate } = useApolloMutation<D, S>(mutation, rest);
  const { done$, fail$ } = useSagaReturns(rest);
  return (variables: S) => saga$({ done$, fail$, mapError, saga: () => mutate(variables, {}) as Promise<S> });
}
export function isUseMutationP<D, S, F>(p: T.GetTypedOpP | T.UseMutationP<D, S, F>): p is T.UseMutationP<D, S, F> {
  return (p as T.UseMutationP<D, S, F>).mutation !== undefined;
}

function mapError(error: Error): Error {
  let id: T.Maybe<string> = null;
  if (error.message === 'request is not implemented') id = 'useMutation.MUTATION_UNKNOWN';
  return id ? getError(id) : error;
}
