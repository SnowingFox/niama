import { getMutation } from '@niama/api';
import { saga$, sagaDone$, sagaFail$ } from '@niama/core';
import { useMutation } from '@vue/apollo-composable';
import { decode } from 'jsonwebtoken';
import { Cookies } from 'quasar';
import { defer, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import * as T from './types';

// MAIN ====================================================================================================================================

/*export async function getCurrent<C extends T.Config>(): Promise<T.Current> {
  const dto: T.Maybe<C['CurrentDto']> = await getCurrentDto();
  return { dto, id: getCurrentId(dto), roles: getCurrentRoles(dto) };
}

export function getCurrentId<C extends T.Config>(dto: C['CurrentDto']): T.Maybe<string> {
  return dto ? dto.id : null;
}

export function getCurrentDto<C extends T.Config>(): Promise<T.Maybe<C['CurrentDto']>> {
  const accessCookie: string = process.env.AUTH_COOKIE_ACCESS || 'niama_access';
  return Promise.resolve(Cookies.has(accessCookie) ? decode(Cookies.get(accessCookie)) : null);
}

export function getCurrentRoles<C extends T.Config>(dto: C['CurrentDto']): C['Role'][] {
  return dto ? dto.roles : ['PUBLIC'];
}

export function signupToDto<C extends T.Config>(input: C['Signup']): C['SignupDto'] {
  return input;
}

// SERVICE =================================================================================================================================

export const refresh$ = ({ $niama, navigate, resetApi = false, switcher, ...p }: T.RefreshP): T.Observable =>
  defer(() => ($niama.auth as any).getCurrent(p)).pipe(
    // tap((current) => ($niama.auth.current = current)),
    // switchMap(() => (resetApi ? $niama.api.resetStore$ : of(null))),
    switchMap(switcher || ((s) => of(s))),
    switchMap(() => (navigate ? $niama.router.replace({ name: navigate }) : (s) => of(s)))
  );

export const signin$ = ({ $niama, input, ...opts }: T.SigninP): T.Observable =>
  saga$({
    saga: () => {
      try {
        const { mutate } = useMutation(
          getMutation({ selector: 'signin', varTypes: { email: 'String!', password: 'String!', username: 'String!' } })
        );
        return mutate(input, {});
      } catch (err) {
        throw new Error('popol');
      }
    },
    fail$: sagaFail$(opts),
    // done$: () => refresh$({ $niama, navigate: $niama.auth.signedInRoute, resetApi: true, switcher: sagaDone$(opts) }),
  });

export const signout$ = ({ $niama, ...opts }: T.SignoutP): T.Observable => {
  const { mutate } = useMutation(getMutation({ selector: 'signout' }));
  return saga$({
    saga: () => mutate({}, {}),
    fail$: sagaFail$(opts),
    // done$: () => refresh$({ $niama, navigate: $niama.auth.signedOutRoute, resetApi: true, switcher: sagaDone$(opts) }),
  });
};

export const signup$ = ({ $niama, input, ...opts }: T.SignupP): T.Observable => {
  const { mutate } = useMutation(
    getMutation({ selector: 'signup', varTypes: { email: 'String!', password: 'String!', username: 'String!' } })
  );
  return saga$({ saga: () => mutate(input, {}), ...opts });
};

export const allServices = {
  getCurrent,
  refresh$,
  signin$,
  signout$,
  signup$,
  signupToDto,
};*/
