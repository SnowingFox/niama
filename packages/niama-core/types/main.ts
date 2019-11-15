import * as Address from '@niama/address/types';
import * as Api from '@niama/api/types';
import * as Auth from '@niama/auth/types';

import { VueI18n, VueRouter } from './externals';

// PROVIDER ================================================================================================================================

export interface NiamaProvider {
  address: Address.Provider;
  api: Api.Provider;
  auth: Auth.Provider;
  i18n: VueI18n;
  router: VueRouter;
}
export type NiamaProviderNames = 'address' | 'api' | 'auth' | 'i18n' | 'router';

// OBJECTS ==================================================================================================================================

export interface ChanceImageO {
  blur?: number;
  grayscale?: boolean;
  height?: number;
  id?: number;
  width?: number;
  withExtension?: boolean;
}

export interface Dict<T = string> {
  [index: string]: T;
}

export type I18n<T extends string = string> = Record<T, string>;
export type Key<T extends { [i: string]: any }> = keyof T;
export type Map<T, To = any> = { [index in keyof T]-?: NonNullable<To> };
export type Maybe<T> = T | null;
export type Promiser<T = any> = () => Promise<T>;
export type StringMap<T> = { [index in keyof T]: string };
export type Type<T> = new (...args: any[]) => T;
