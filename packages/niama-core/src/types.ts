export interface Dict<T = string> {
  [index: string]: T;
}

export type I18n<T extends string = string> = { [index in T]: string };
export type Key<T extends { [i: string]: any }> = keyof T;
export type Map<T, To = any> = { [index in keyof T]-?: NonNullable<To> };
export type Maybe<T> = T | null;
export type StringMap<T> = { [index in keyof T]: string };
export type Type<T> = new (...args: any[]) => T;
