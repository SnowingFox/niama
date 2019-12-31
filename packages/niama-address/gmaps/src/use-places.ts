import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { fromResult, getPlaceDetailsUrl, suggestionsFromPredictions } from './helper';
import { useAddress } from './provider';
import * as T from './types';

export const usePlaces = ({ countries, fields, type = 'address' }: T.PlacesUseP = {}) => {
  const { service$ } = useAddress();

  const autoalways$ = service$.pipe(map(({ places: { AutocompleteService } }) => new AutocompleteService()));
  const places$ = service$.pipe(map(({ places: { PlacesService } }) => new PlacesService(document.createElement('div'))));

  const getFromInput$ = autoalways$.pipe(
    map((autocomplete) => (p: T.PlacesAutocompletionRequest) => {
      const res: Subject<T.Suggestion[]> = new Subject();
      p = { types: [type], ...(countries && { componentRestrictions: { country: countries } }), ...p };
      p.input !== '' ? autocomplete.getPlacePredictions(p, (results) => res.next(suggestionsFromPredictions(results))) : res.next([]);

      return res.asObservable();
    })
  );

  const getDetails$ = places$.pipe(
    map((s) => (p: T.PlacesDetailsRequest) => {
      const res = new Subject<T.Vo>();
      s.getDetails({ fields, ...p }, (result) => res.next(fromResult(result)));
      return res.asObservable();
    })
  );

  return { getDetails$, getFromInput$ };
};
