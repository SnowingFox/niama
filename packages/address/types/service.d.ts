import { Maybe, SagaCfg } from '@niama/core/types';

import { Coords, Hint, HintType, Po } from './main';

// SERVICES ================================================================================================================================

export type ServiceK = 'fromCoords' | 'fromValue' | 'hintsFromInput';
export type UseSagaP<C extends SagaCfg> = { name: ServiceK } & C['UseP'];
export type UseSagaL$P<C extends SagaCfg> = { name: ServiceK } & C['L$P'];

// FROM COORDS =============================================================================================================================

export type FromCoordsC<Done = Maybe<Po>, Fail = null> = SagaCfg<Coords, Maybe<Po>, Done, Fail>;
export type FromCoordsP<Done = Maybe<Po>, Fail = null> = FromCoordsC<Done, Fail>['P'];
export type FromCoordsR<Done = Maybe<Po>, Fail = null> = FromCoordsC<Done, Fail>['R'];
export type UseFromCoordsP<Done = Maybe<Po>, Fail = null> = FromCoordsC<Done, Fail>['UseP'];
export type UseFromCoordsL$P<Done = Maybe<Po>, Fail = null> = FromCoordsC<Done, Fail>['L$P'];


// FROM VALUE ==============================================================================================================================

export interface FromValueO {
  fields?: any[];
}

export type FromValueC<Done = Po, Fail = null> = SagaCfg<string, Po, Done, Fail, FromValueO>;
export type FromValueP<Done = Po, Fail = null> = FromValueC<Done, Fail>['P'];
export type FromValueR<Done = Po, Fail = null> = FromValueC<Done, Fail>['R'];
export type UseFromValueP<Done = Maybe<Po>, Fail = null> = FromValueC<Done, Fail>['UseP'];
export type UseFromValueL$P<Done = Maybe<Po>, Fail = null> = FromValueC<Done, Fail>['L$P'];

// HINTS FROM INPUT ====================================================================================================================

export interface HintsFromInputO {
  countries?: string[];
  type?: HintType;
}

export type HintsFromInputC<Done = Hint[], Fail = null> = SagaCfg<string, Hint[], Done, Fail, HintsFromInputO>;
export type HintsFromInputP<Done = Hint[], Fail = null> = HintsFromInputC<Done, Fail>['P'];
export type HintsFromInputR<Done = Hint[], Fail = null> = HintsFromInputC<Done, Fail>['R'];
export type UseHintsFromInputP<Done = Maybe<Po>, Fail = null> = HintsFromInputC<Done, Fail>['UseP'];
export type UseHintsFromInputL$P<Done = Maybe<Po>, Fail = null> = HintsFromInputC<Done, Fail>['L$P'];