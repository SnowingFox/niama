import { getError } from '@niama/address';
import { mapValues, saga as baseSaga } from '@niama/core';
import { AsyncSubject, defer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as T from './typings';
import { fromResult, getApiUrl, hintsFromPredictions } from './utils';

// INIT ====================================================================================================================================

export const initProvider = (opts: T.BootO): T.Provider => {
  const raw = { loading: false, $: new AsyncSubject<T.Raw>() };
  const observables = { fromCoords, fromValue, init$, hintsFromInput };
  return { opts, raw, ...(mapValues(observables, (s) => s({ opts, raw })) as T.Services) };
};

// SAGA ====================================================================================================================================

const bootSaga = <D, R = D, S = void, F = null>({ act, raw, ...sagaO }: T.BootSagaP<D, R, S, F>): T.Observabler<D | F, S> => {
  // const mapError = (err: Error) => (err.name ? getError(`gmaps.${err.name}`) : err);
  return (...src: [S]) => raw.$.pipe(switchMap(baseSaga({ act: async ($) => act($, ...src), ...sagaO })));
};

// SERVICES ================================================================================================================================

const fromCoords = ({ raw }: T.ServiceO) => <D, F = null>(p: T.FromCoordsP<D, F>): T.FromCoordsR<D, F> => {
  const act = ({ Geocoder }: T.Raw, coords: T.Coords): Promise<T.Maybe<T.Po>> =>
    new Promise<T.Maybe<T.Po>>((resolve) => {
      const geocoder = new Geocoder();
      const cb = (r: T.GeocoderResult[], s: T.GeocoderStatus) => resolve(s === 'OK' && r.length > 0 ? fromResult(r[0]) : null);
      geocoder.geocode({ location: coords }, cb);
    });
  return bootSaga({ act, raw, ...p });
};

const fromValue = ({ raw }: T.ServiceO) => <D, F = null>(p: T.FromValueP<D, F>): T.FromValueR<D, F> => {
  const act = ({ places: { PlacesService } }: T.Raw, placeId: string): Promise<T.Po> =>
    new Promise<T.Po>((resolve, reject) => {
      if (!placeId) return reject(getError('fromValue.Undefined'));
      const places = new PlacesService(document.createElement('div'));
      const cb = (r: T.PlacesResult) => resolve(fromResult(r));
      places.getDetails({ fields: ['ALL'], placeId }, cb);
    });
  return bootSaga({ act, raw, ...p });
};

const init$ = ({ opts, raw }: T.ServiceO) =>
  defer(() => {
    if (!raw.loading) {
      raw.loading = true;
      const script: HTMLScriptElement = document.createElement('script');
      const attrs = { src: getApiUrl({ opts, callback: 'niamaLoaded' }), async: true, defer: true };
      for (const key in attrs) script.setAttribute(key, attrs[key]);
      document.body.appendChild(script);

      if (window !== undefined)
        window['niamaLoaded'] = () => {
          raw.$.next((window['google'].maps as unknown) as T.Raw);
          raw.$.complete();
        };
    }
    return raw.$;
  });

const hintsFromInput = ({ raw }: T.ServiceO) => <D = T.Hint[], F = null>(p: T.HintsFromInputP<D, F>): T.HintsFromInputR<D, F> => {
  const { countries, type, ...rest } = p;

  const optsToGmaps: Omit<T.PlacesAutocompletionRequest, 'input'> = {
    ...(countries ? { componentRestrictions: { country: countries } } : {}),
    ...(type ? { types: [type === 'city' ? '(cities)' : type === 'region' ? `(regions)` : type] } : {}),
  };

  const act = ({ places: { AutocompleteService } }: T.Raw, input: string): Promise<T.Hint[]> =>
    new Promise<T.Hint[]>((resolve) => {
      const autocomplete = new AutocompleteService();
      const cb = (r: T.PlacesPrediction[]) => resolve(input !== '' ? hintsFromPredictions(r) : []);
      autocomplete.getPlacePredictions({ input, ...optsToGmaps }, cb);
    });

  return bootSaga({ act, raw, ...rest });
};
