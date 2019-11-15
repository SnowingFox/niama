import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { useAddress } from './provider';
import * as T from './types';

export const useGeocoder = () => {
  const { service$ } = useAddress();
  const geocoder$ = service$.pipe(map(({ Geocoder }) => new Geocoder()));

  const geocode$ = geocoder$.pipe(
    map((geocoder) => (p: T.GeocoderRequest) => {
      const res: Subject<T.GeocoderResult[]> = new Subject();
      geocoder.geocode(p, (results, status) => (status === 'OK' ? res.next(results) : res.error(new Error(`address.${status}`))));
      return res.asObservable();
    })
  );

  return { geocode$ };
};
