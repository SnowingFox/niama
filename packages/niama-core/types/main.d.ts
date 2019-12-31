import { Niama } from './';

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

export type Actioner<Res = unknown, Src = undefined> = Syncer<Res, Src> | Asyncer<Res, Src>;
export type Asyncer<Res = unknown, Src = undefined> = (s?: Src) => Promise<Res>;
export type Syncer<Res = unknown, Src = undefined> = (s?: Src) => Res;

export type I18n<T extends string = string> = Record<T, string>;
export type Key<T extends { [i: string]: unknown }> = keyof T;
export type Map<T, To = unknown> = { [index in keyof T]-?: NonNullable<To> };
export type Maybe<T> = T | null;
export type StringMap<T> = { [index in keyof T]: string };
export type Type<T> = new (...args: unknown[]) => T;
