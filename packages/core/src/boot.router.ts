import { reactive } from '@vue/composition-api';

import * as T from '../types';
import { setProvider } from './provider';

export const bootRouter = (router: T.VueRouter) => {
  setProvider({ id: 'router', provider: reactive(router) as unknown as T.VueRouter });
};
