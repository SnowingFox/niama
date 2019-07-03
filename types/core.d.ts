import * as E from './externals';

export type Dict<T = string> = { [index: string]: T };

export type Future<T> = T | Promise<T> | E.Observable<T>;

export interface HmrModule extends NodeModule {
  hot: { accept(): void; dispose(fn: () => void): void };
}

export type I18n<T extends string = string> = { [index in T]: string };

export type Key<T extends { [i: string]: any }> = keyof T;

export type Map<T, To = any> = { [index in keyof T]-?: NonNullable<To> };

export type Maybe<T> = T | null;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// export type Required<T> = T extends object ? { [P in keyof T]-?: NonNullable<T[P]> } : T;

export type StringMap<T> = { [index in keyof T]: string };

export interface TransformO<From, To> {
  from?: (i: Partial<From>) => From;
  to?: (i: To) => To;
  value?: To | ((i: To) => To);
}

export type Type<T> = E.ClassType<T>;
