import { switchMap } from 'rxjs/operators';

import { upperFirst } from './lodash';
import { saga } from './rx';
import * as T from './typings';
import { useSagaReturns } from './uses';

/**
 * Helper used to create a package boot.
 *
 * @template Params - Parameters used during the boot process.
 * @template Provider - is the Provider.
 * @template Raw - Raw config.
 * @template Services - List of services offered by the provider.
 *
 * @param setBoot - Method used by the booter to initialize boot from the provider.
 * @param setRaw - Method used by the booter to initialize the raw config from the raw service.
 * @param setServices - Method used by the booter to initialize the provider services from the raw config.
 *
 * @returns Method used to boot the package from parameters and initialize it offering a dedicated provider.
 */
export const booter = <Params, Provider extends T.GetProvider<Params, Raw, Services>, Raw, Services>(
  setBoot: T.GetSetBoot<Provider>,
  setRaw: T.GetSetRaw<Params, Raw>,
  setServices: T.GetSetServices<Params, Raw, Services>
): T.GetBoot<Params> => async (params) => {
  const raw = setRaw(params);
  const provider = { params, raw, $: setServices(raw, params) };
  await setBoot(provider as Provider);
};

export const getBootSaga = <C extends T.GetBootC>(errorer: T.Errorer) => <D, Res = D, Src = void, F = null>(
  raw: C['Raw'],
  act: ($: C['Raw$'], ...src: [Src]) => Res | Promise<Res>,
  opts?: T.SagaO<D, Res, F>
): T.Observabler<D | F, Src> => {
  const mapError = (error: Error) => (error.name ? errorer(error.name) : error);
  return (...src: [Src]) => raw.$.pipe(switchMap(saga(async ($) => await act($, ...src), { ...opts, mapError })));
};

export const getUseSagaServicer = <C extends T.GetSagaServiceC>(pkg: string) => (service: string): C['Use'] => (opts = {}) => {
  const { $niama, done, fail } = useSagaReturns({ notifyId: `${pkg}.Use${upperFirst(service)}`, ...opts });
  return ($niama[pkg].$[service] as C['Saga'])({ done, fail });
};
