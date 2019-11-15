import { Observable, Ref, Subject } from './externals';
import { NiamaProvider } from './main';

// OBJECTS =================================================================================================================================

export type Observabler<Result = any, Source = any> = (s: Source) => Observable<Result>;

export interface Loadable<Result = any> {
  result$: Observable<Result>;
  loading: Ref<boolean>;
}

export interface Sourcable<Result = any, Source = any> extends Loadable<Result> {
  source$: Subject<Source>;
}

// PARAMS ==================================================================================================================================

export interface GetLoadableP<Result = any, Source = any> {
  autosubscribe?: boolean;
  source$: Observable<Source>;
  switcher: Observabler<Result, Source>;
}

export interface GetSourcableP<Result = any, Source = any> {
  autosubscribe?: boolean;
  switcher: Observabler<Result, Source>;
}

export interface NotifyErrorP {
  $niama: Pick<NiamaProvider, 'i18n'>;
  error: Error;
  messageId?: string;
  prefix?: string;
}

export interface RequestP<Result = any, Source = any> extends RequestO<Result, Source> {
  request: () => Promise<Source>;
}

// OPTIONS =================================================================================================================================

export interface RequestO<Result = any, Source = any> {
  complete$?: Observabler<Result, Source | Error>;
  error$?: Observabler<Result, Error>;
  onComplete?: (Result: Source | Error) => Result | Promise<Result>;
  onSuccess?: (s: Source) => Result | Promise<Result>;
  success$?: Observabler<Result, Source>;
}