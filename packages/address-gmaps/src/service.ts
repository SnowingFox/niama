import { getError } from '@niama/address';
import { saga as baseSaga } from '@niama/core';
import { AsyncSubject, defer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as T from './types';
import { fromResult, getApiUrl, proposalsFromPredictions } from './utils';

export const initProvider = (opts: T.BootO): T.Provider => {
  const service = { loading: false, $: new AsyncSubject<T.Service>() };

  const init = () => {
    if (!service.loading) {
      service.loading = true;
      const script: HTMLScriptElement = document.createElement('script');
      const attrs = { src: getApiUrl({ opts, callback: 'niamaLoaded' }), async: true, defer: true };
      for (const key in attrs) script.setAttribute(key, attrs[key]);
      document.body.appendChild(script);

      if (window !== undefined)
        window['niamaLoaded'] = () => {
          service.$.next((window['google'].maps as any) as T.Service);
          service.$.complete();
        };
    }
    return service.$;
  };

  const init$ = defer(init);

  type SagaP<D, R = D, S = void, F = null> = { act: ($: T.Service, ...src: [S]) => Promise<R> } & T.SagaO<D, R, F>;

  const saga = <D, R = D, S = void, F = null>({ act, ...sagaO }: SagaP<D, R, S, F>): T.Observabler<D | F, S> => {
    // const mapError = (err: Error) => (err.name ? getError(`gmaps.${err.name}`) : err);
    return (...src: [S]) => init$.pipe(switchMap(baseSaga({ act: async ($) => act($, ...src), ...sagaO })));
  };

  const fromCoords = <D, F = null>(p: T.FromCoordsC<D, F>['P']): T.FromCoordsC<D, F>['R'] =>
    saga({
      act: ({ Geocoder }, coords) =>
        new Promise<T.Maybe<T.Po>>((resolve) => {
          const geocoder = new Geocoder();
          const cb = (r: T.GeocoderResult[], s: T.GeocoderStatus) => resolve(s === 'OK' && r.length > 0 ? fromResult(r[0]) : null);
          geocoder.geocode({ location: coords }, cb);
        }),
      ...p,
    });

  const fromValue = <D, F = null>(p: T.FromValueC<D, F>['P']): T.FromValueC<D, F>['R'] =>
    saga({
      act: ({ places: { PlacesService } }, placeId) =>
        new Promise<T.Po>((resolve, reject) => {
          if (!placeId) return reject(getError('fromValue.Undefined'));
          const places = new PlacesService(document.createElement('div'));
          const cb = (r: T.PlacesResult) => resolve(fromResult(r));
          places.getDetails({ fields: ['ALL'], placeId }, cb);
        }),
      ...p,
    });

  const proposalsFromInput = <D = T.Proposal[], F = null>(p: T.ProposalsFromInputC<D, F>['P']): T.ProposalsFromInputC<D, F>['R'] => {
    const { countries, type, ...rest } = p;

    const optsToGmaps: Omit<T.PlacesAutocompletionRequest, 'input'> = {
      ...(countries ? { componentRestrictions: { country: countries } } : {}),
      ...(type ? { types: [type === 'city' ? '(cities)' : type === 'region' ? `(regions)` : type] } : {}),
    };

    return saga({
      act: ({ places: { AutocompleteService } }, input) =>
        new Promise<T.Proposal[]>((resolve) => {
          const autocomplete = new AutocompleteService();
          const cb = (r: T.PlacesPrediction[]) => resolve(input !== '' ? proposalsFromPredictions(r) : []);
          autocomplete.getPlacePredictions({ input, ...optsToGmaps }, cb);
        }),
      ...rest,
    });
  };

  return { service, opts, fromCoords, fromValue, init$, proposalsFromInput };
};
