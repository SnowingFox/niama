/*import { map } from 'rxjs/operators';

import * as T from './types';

const init$ =

const load = () => {
  const script: HTMLScriptElement = document.createElement('script');
  const attrs = { src: getApiUrl({ $niama: { address: provider }, callback: 'niamaLoaded' }), async: true, defer: true };
  for (const key in attrs) script.setAttribute(key, attrs[key]);
  document.body.appendChild(script);
};

if (window !== undefined)
  window['niamaLoaded'] = () => {
    provider.service$.next((window['google'].maps as any) as T.Service);
    provider.service$.complete();
  };

provide(sym, { ...provider, load, loading$: new BehaviorSubject(false) });

const autocomplete$ = ({ $niama }) => $niama.address.service$.pipe(map(({ places: { AutocompleteService } }) => new AutocompleteService()));

const places$ = ({ $niama }) =>
  $niama.address.service$.pipe(map(({ places: { PlacesService } }) => new PlacesService(document.createElement('div'))));

const suggest$ = ({ $niama, data, opts }) =>
  autocomplete$({ $niama }).pipe(
    map((autocomplete) => (p: T.PlacesAutocompletionRequest) => {
      const res: Subject<T.Option[]> = new Subject();
      p = { types: [type], ...(countries && { componentRestrictions: { country: countries } }), ...p };
      p.input !== '' ? autocomplete.getPlacePredictions(p, (predictions) => res.next(optionsFromPredictions(predictions))) : res.next([]);

      return res.asObservable();
    })
  );

const getById$ = ({ $niama, data, opts }) =>
  places$({ $niama }).pipe(
    map((s) => (p: T.PlacesDetailsRequest) => {
      const res = new Subject<T.Vo>();
      s.getDetails({ fields, ...p }, (result) => res.next(fromResult(result)));
      return res.asObservable();
    })
  );*/
