/**
 * @packageDocumentation
 * @module @niama/core/types
 */

import { AsyncSubject, Observable } from './externals';
import { Actioner } from './main';
import { Loadable, Observabler, SagaO, SagaReturnsO, Sourcable } from './rx';

// CONFIG ==================================================================================================================================

/**
 * `GetBootC` creates a config from the params used during the boot process, the raw service from the third library and a list of services
 * offered by the provider.
 *
 * @template Raw$ - Raw service from the third library.
 * @template Services - List of services offered by the provider.
 * @template Params - Parameters used during the boot process.
 */
export interface GetBootC<Raw$ = any, Services = any, Params = any> {
  /**
   * Parameters used during the boot process.
   */
  Params: Params;
  /**
   * Raw service from the third library.
   */
  Raw$: Raw$;
  /**
   * List of services offered by the provider.
   */
  Services: Services;
  /**
   * Provider offering access to services, but also the boot parameters and the raw config.
   */
  Provider: GetProvider<Params, GetBootC<Raw$, Services, Params>['Raw'], Services>;
  /**
   * Raw config containing the raw service wrapped inside an async subject and its state.
   */
  Raw: {
    /**
     * Async subject of the raw service. It only emits when completed insuring that the raw service is initialized.
     */
    $: AsyncSubject<Raw$>;
    /**
     * Flag indicating if the raw service is idle or currently loading.
     */
    idle: boolean;
  };
  /**
   * Method used to boot the package from parameters and initialize it offering a dedicated provider.
   *
   * @param params - Parameters used during the boot process.
   */
  Boot: (params: Params) => void;
  /**
   * Method
   */
  BootSaga: <Done, Res = Done, Src = void, Fail = null>(
    raw: GetBootC<Raw$, Services, Params>['Raw'],
    act: ($: Raw$, ...src: [Src]) => Promise<Res>,
    opts?: SagaO<Done, Res, Fail>
  ) => Observabler<Done | Fail, Src>;
}

export type GetServicer<C extends GetBootC, Service> = (raw: C['Raw'], params: C['Params']) => Service;

export interface GetProvider<Params, Raw, Services> {
  /**
   * Parameters used during the boot process.
   */
  params: Params;
  /**
   * Raw config.
   */
  raw: Raw;
  /**
   * List of services offered by the provider.
   */
  $: Services;
}

export interface GetRaw<Raw$> {
  /**
   * Async subject of the raw service. It only emits when completed insuring that the raw service is initialized.
   */
  $: AsyncSubject<Raw$>;
  /**
   * Flag indicating if the raw service is idle or currently loading.
   */
  idle: boolean;
}

/*export interface GetBoot<Params> {
  (params: Params): void;
}*/
export type GetBoot<Params> = Actioner<void, Params>;

/*export type GetSetBoot<Provider> =
  /**
   * Method used by the booter to initialize boot from the provider.
   *
   * @param provider - package provider.
   *
  (provider: Provider) => void;*/
export type GetSetBoot<Provider> = Actioner<void, Provider>;

export type GetSetRaw<Params, Raw> =
  /**
   * Method used by the booter to initialize the raw config from the raw service.
   *
   * @param params - Parameters used during the boot process.
   * @returns the raw config.
   */
  (params: Params) => Raw;

export type GetSetServices<Params, Raw, Services> =
  /**
   * Method used by the booter to initialize the provider services from the raw config.
   *
   * @param raw - raw config.
   * @param params - Parameters used during the boot process.
   * @returns the list of services offered by the provider.
   */
  (raw: Raw, params: Params) => Services;

// SERVICES ================================================================================================================================

export interface GetSagaServiceC<C extends GetBootC = GetBootC, Src = any, Res = any, Extra = {}, Done = Res, Fail = null> {
  Extra: Extra;
  Res: Res;
  Src: Src;
  Saga: <D = Done, F = Fail>(opts?: SagaO<D, Res, F> & Extra) => Observabler<D | F, Src>;
  SagaO: SagaO<Done, Res, Fail> & Extra;
  Servicer: (raw: C['Raw'], params: C['Params']) => GetSagaServiceC<C, Src, Res, Extra, Done, Fail>['Saga'];
  Use: <D = Done, F = Fail>(opts?: SagaReturnsO<D, Res, F> & Extra) => Observabler<D | F, Src>;
  UseL$: <D = Done, F = Fail>(src$: Observable<Src>, opts?: SagaReturnsO<D, Res, F> & Extra) => Loadable<D | F>;
  UseS$: <D = Done, F = Fail>(opts?: SagaReturnsO<D, Res, F> & Extra) => Sourcable<D | F, Src>;
  UseO: SagaReturnsO<Done, Res, Fail> & Extra;
}
