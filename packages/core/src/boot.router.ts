import { reactive } from '@vue/composition-api';

import { setProvider } from './provider';
import * as T from './typings';

export const bootRouter = (router: T.VueRouter) => {
  setProvider({ id: 'router', provider: reactive(router) as unknown as T.VueRouter });
};
