import { upperFirst, useLoadable, useNiama, useSagaReturns, useSourcable } from '@niama/core';
import { onBeforeUnmount, onMounted } from '@vue/composition-api';
import { AsyncSubject, forkJoin } from 'rxjs';

import * as T from './types';

// BASE ====================================================================================================================================

export const useSaga = <C extends T.SagaCfg>({ name, ...p }: T.UseSagaP<C>): C['R'] => {
  const { $niama, done, fail } = useSagaReturns({ notifyId: `address.Use${upperFirst(name)}`, ...p });
  return $niama.address[name as string]({ done, fail });
};

export const useSagaL$ = <C extends T.SagaCfg>({ name, ...p }: T.UseSagaL$P<C>): C['L$R'] => {
  const { src$, ...rest } = p;
  return useLoadable({ src$, switcher: useSaga<C>({ name, ...rest }) });
};

export const useSagaS$ = <C extends T.SagaCfg>(p: T.UseSagaP<C>): C['S$R'] => useSourcable(useSaga<C>(p));

// LIFECYCLE ===============================================================================================================================

export const onMountedAndInitialized = (actioner: T.Actioner<void, T.Service>) => {
  const { address } = useNiama();
  const isMounted$ = new AsyncSubject();

  onMounted(() => {
    isMounted$.next(true);
    isMounted$.complete();
  });

  onBeforeUnmount(() => subscription.unsubscribe());

  const subscription = forkJoin(address.init$, isMounted$).subscribe(([$]) => {
    actioner($);
  });
};

// USES ====================================================================================================================================

export const useFromCoords = <D = T.Maybe<T.Po>, F = null>(p: T.FromCoordsC<D, F>['UseP'] = {}) =>
  useSaga<T.FromCoordsC<D, F>>({ name: 'fromCoords', ...p });

export const useFromCoordsL$ = <D = T.Maybe<T.Po>, F = null>(p: T.FromCoordsC<D, F>['L$P']) =>
  useSagaL$<T.FromCoordsC<D, F>>({ name: 'fromCoords', ...p });

export const useFromCoordsS$ = <D = T.Maybe<T.Po>, F = null>(p: T.FromCoordsC<D, F>['UseP'] = {}) =>
  useSagaS$<T.FromCoordsC<D, F>>({ name: 'fromCoords', ...p });

export const useFromValue = <D = T.Po, F = null>(p: T.FromValueC<D, F>['UseP'] = {}) =>
  useSaga<T.FromValueC<D, F>>({ name: 'fromValue', ...p });

export const useFromValueL$ = <D = T.Po, F = null>(p: T.FromValueC<D, F>['L$P']) =>
  useSagaL$<T.FromValueC<D, F>>({ name: 'fromValue', ...p });

export const useFromValueS$ = <D = T.Po, F = null>(p: T.FromValueC<D, F>['UseP'] = {}) =>
  useSagaS$<T.FromValueC<D, F>>({ name: 'fromValue', ...p });

export const useProposalsFromInput = <D = T.Proposal[], F = null>(p: T.ProposalsFromInputC<D, F>['UseP'] = {}) =>
  useSaga<T.ProposalsFromInputC<D, F>>({ name: 'proposalsFromInput', ...p });

export const useProposalsFromInputL$ = <D = T.Proposal[], F = null>(p: T.ProposalsFromInputC<D, F>['L$P']) =>
  useSagaL$<T.ProposalsFromInputC<D, F>>({ name: 'proposalsFromInput', ...p });

export const useProposalsFromInputS$ = <D = T.Proposal[], F = null>(p: T.ProposalsFromInputC<D, F>['UseP'] = {}) =>
  useSagaS$<T.ProposalsFromInputC<D, F>>({ name: 'proposalsFromInput', ...p });
