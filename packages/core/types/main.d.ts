import { Niama } from './';
import { Ref, VueI18n } from './externals';

// NIAMA ===================================================================================================================================

export type NiamaKeys = keyof Niama;
export type NiamaOnInit = Syncer<void>[];

export interface NiamaProviderInit<K extends NiamaKeys = NiamaKeys> {
  id: K;
  onInit?: Syncer<void>;
  provider: Niama[K];
}

// PROPS ===================================================================================================================================

export interface GetErrorP {
  id: string;
  type?: string;
}

// OBJECTS =================================================================================================================================

export type Actioner<Res = void, Src = void> = Syncer<Res, Src> | Asyncer<Res, Src>;
export type Asyncer<Res = void, Src = void> = (...s: [Src]) => Promise<Res>;
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
export type Dict<T = string> = { [index: string]: T };
export type I18n<T extends string = string> = Record<T, string>;
export type Key<T extends { [i: string]: unknown }> = keyof T;
export type Map<T, To = unknown> = { [index in keyof T]-?: NonNullable<To> };
export type Maybe<T> = T | null;
export type Opt<T> = T | undefined;
export type RefOnly<T> = Readonly<Ref<Readonly<T>>>;
export type StringMap<T> = { [index in keyof T]: string };
export type Syncer<Res = void, Src = void> = (...s: [Src]) => Res;
export type Type<T> = new (...args: unknown[]) => T;

// I18N ====================================================================================================================================

export interface BootI18nP extends VueI18n.I18nOptions {
  app: any;
  Vue: any;
}
