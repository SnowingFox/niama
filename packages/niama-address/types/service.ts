import { NiamaProvider, NiamaProviderKeys, Observable } from '@niama/core/types';

import { Dto, Suggestion, SuggestionType } from './objects';

// BASE PARAMS =============================================================================================================================

export interface ServiceP<Props extends NiamaProviderKeys = 'address'> {
  $niama: Pick<NiamaProvider, Props>;
}

// FROM VALUE =================================================================================================================================

export interface FromValueO {
  fields?: any[];
  value: string;
}

export interface FromValueP extends FromValueO, ServiceP {}

export type FromValueR = Observable<Dto>;

// SUGGESIONS FROM INPUT ===================================================================================================================

export interface SuggestionsFromInputO {
  countries?: string[];
  input: string;
  type?: SuggestionType;
}

export interface SuggestionsFromInputP extends SuggestionsFromInputO, ServiceP {}

export type SuggestionsFromInputR = Observable<Suggestion[]>;
