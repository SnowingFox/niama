import { saga, useSagaReturns } from '@niama/core';
import { useMutation as useApolloMutation } from '@vue/apollo-composable';

import * as T from './typings';
import { getError, getMutation } from './utils';

export const useMutation = <D, S, F>(p: T.GetTypedOpP | T.UseMutationP<D, S, F>): T.Observabler<D | F, S> => {
  const { mutation, ...rest }: T.UseMutationP<D, S, F> = isUseMutationP(p) ? p : { mutation: getMutation(p) };
  const { mutate } = useApolloMutation<D, S>(mutation, rest as any); // CHECK TYPE
  const { done, fail } = useSagaReturns(rest);
  return saga({ done, fail, mapError, act: (variables) => mutate(variables) as Promise<S> });
};
export const isUseMutationP = <D, S, F>(p: T.GetTypedOpP | T.UseMutationP<D, S, F>): p is T.UseMutationP<D, S, F> =>
  'mutation' in (p as T.UseMutationP<D, S, F>);

const mapError = (error: Error): Error => {
  let id: T.Maybe<string> = null;
  if (error.message === 'request is not implemented') id = 'useMutation.Unknown';
  return id ? getError(id) : error;
};
