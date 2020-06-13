/**
 * @packageDocumentation
 * @module @niama/core/types
 */

import { Niama } from '@niama/core/types';

import { Ref } from './externals';

// NIAMA ===================================================================================================================================

export type NiamaKeys = keyof Niama;
export type NiamaOnInit = Syncer<void>[];

// OBJECTS =================================================================================================================================

export type Actioner<Res = void, Src = void> = Syncer<Res, Src> | Asyncer<Res, Src>;
export type Asyncer<Res = void, Src = void> = (...s: [Src]) => Promise<Res>;
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type Dict<Value = any, Constraint = undefined> = [Constraint] extends [string | number | symbol]
  ? Record<Constraint, Value>
  : Record<string, Value>;

export type Errorer = (id: string, scope?: Dict) => Error;
export type I18n<T extends string = string> = Record<T, string>;
export type Key<T extends { [i: string]: unknown }> = keyof T;
export type Map<T, To = unknown> = { [index in keyof T]-?: NonNullable<To> };
export type Maybe<T> = T | null;
export type Opt<T> = T | undefined;

export type Rec<Key extends string | number | symbol, Value, Extra = undefined> = [Extra] extends [string | number | symbol]
  ? Record<Key | Extra, Value>
  : Record<Key, Value>;

export type RefOnly<T> = Readonly<Ref<Readonly<T>>>;
export type StringMap<T> = { [index in keyof T]: string };
export type Syncer<Res = void, Src = void> = (...s: [Src]) => Res;
export type Type<T> = new (...args: unknown[]) => T;
