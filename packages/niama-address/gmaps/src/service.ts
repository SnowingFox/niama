import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { fromResult, getApiUrl, suggestionsFromPredictions } from './helper';
import * as T from './types';

// SERVICES ================================================================================================================================

export const init = ({ $niama }: T.ServiceP) => {
  if ($niama.address.loading) return;
  $niama.address.loading = true;
  const script: HTMLScriptElement = document.createElement('script');
  const attrs = { src: getApiUrl({ $niama, callback: 'niamaLoaded' }), async: true, defer: true };
  for (const key in attrs) script.setAttribute(key, attrs[key]);
  document.body.appendChild(script);

  if (window !== undefined)
    window['niamaLoaded'] = () => {
      $niama.address.service$.next((window['google'].maps as any) as T.Service);
      $niama.address.service$.complete();
    };
};

const autocomplete$ = ({ $niama }: T.ServiceP): T.Observable<T.PlacesAutocompleteS> => {
  init({ $niama });
  return $niama.address.service$.pipe(map(({ places: { AutocompleteService } }) => new AutocompleteService()));
};

const places$ = ({ $niama }: T.ServiceP): T.Observable<T.PlacesS> => {
  init({ $niama });
  return $niama.address.service$.pipe(map(({ places: { PlacesService } }) => new PlacesService(document.createElement('div'))));
};

// METHODS =================================================================================================================================

export const suggestionsFromInput$ = ({ $niama, ...opts }: T.SuggestionsFromInputP): T.SuggestionsFromInputR => {
  const suggestionTypeToGmaps = (type: T.SuggestionType): T.PlacesType =>
    type === 'city' ? '(cities)' : type === 'region' ? `(regions)` : type;

  const countriesToGmaps = (countries: string[]): T.PlacesComponentRestrictions => ({ country: countries });

  const optsToGmaps = ({ countries, input, type }: T.SuggestionsFromInputO): T.PlacesAutocompletionRequest => ({
    input,
    ...(countries ? { componentRestrictions: countriesToGmaps(countries) } : {}),
    ...(type ? { types: [suggestionTypeToGmaps(type)] } : {}),
  });

  return autocomplete$({ $niama }).pipe(
    switchMap((autocomplete) => {
      const res: T.Subject<T.Suggestion[]> = new Subject();
      opts.input !== ''
        ? autocomplete.getPlacePredictions(optsToGmaps(opts), (predictions) => res.next(suggestionsFromPredictions(predictions)))
        : res.next([]);
      return res.asObservable();
    })
  );
};

export const fromValue$ = ({ $niama, ...opts }: T.FromValueP): T.FromValueR => {
  const optsToGmaps = ({ fields = ['ALL'], value: placeId }: T.FromValueO): T.PlacesDetailsRequest => ({ fields, placeId });

  return places$({ $niama }).pipe(
    switchMap((s) => {
      const res = new Subject<T.Dto>();
      s.getDetails(optsToGmaps(opts), (result) => res.next(fromResult(result)));
      return res.asObservable();
    })
  );
};
