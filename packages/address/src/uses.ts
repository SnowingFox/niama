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

export const onMountedAndInitialized = (actioner: T.Actioner<void, T.Raw>) => {
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

export const useFromCoords = <D = T.Maybe<T.Po>, F = null>(p: T.UseFromCoordsP<D, F> = {}) =>
  useSaga<T.FromCoordsC<D, F>>({ name: 'fromCoords', ...p });

export const useFromCoordsL$ = <D = T.Maybe<T.Po>, F = null>(p: T.UseFromCoordsL$P<D, F>) =>
  useSagaL$<T.FromCoordsC<D, F>>({ name: 'fromCoords', ...p });

export const useFromCoordsS$ = <D = T.Maybe<T.Po>, F = null>(p: T.UseFromCoordsP<D, F> = {}) =>
  useSagaS$<T.FromCoordsC<D, F>>({ name: 'fromCoords', ...p });

export const useFromValue = <D = T.Po, F = null>(p: T.UseFromValueP<D, F> = {}) =>
  useSaga<T.FromValueC<D, F>>({ name: 'fromValue', ...p });

export const useFromValueL$ = <D = T.Po, F = null>(p: T.UseFromValueL$P<D, F>) =>
  useSagaL$<T.FromValueC<D, F>>({ name: 'fromValue', ...p });

export const useFromValueS$ = <D = T.Po, F = null>(p: T.UseFromValueP<D, F> = {}) =>
  useSagaS$<T.FromValueC<D, F>>({ name: 'fromValue', ...p });

export const useHintsFromInput = <D = T.Hint[], F = null>(p: T.UseHintsFromInputP<D, F> = {}) =>
  useSaga<T.HintsFromInputC<D, F>>({ name: 'hintsFromInput', ...p });

export const useHintsFromInputL$ = <D = T.Hint[], F = null>(p: T.UseHintsFromInputL$P<D, F>) =>
  useSagaL$<T.HintsFromInputC<D, F>>({ name: 'hintsFromInput', ...p });

export const useHintsFromInputS$ = <D = T.Hint[], F = null>(p: T.UseHintsFromInputP<D, F> = {}) =>
  useSagaS$<T.HintsFromInputC<D, F>>({ name: 'hintsFromInput', ...p });
