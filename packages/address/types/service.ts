import { Maybe, SagaCfg } from '@niama/core/types';

import { Coords, Po, Proposal, ProposalType } from './objects';

// SERVICES ================================================================================================================================

export type ServiceK = 'fromCoords' | 'fromValue' | 'proposalsFromInput';
export type UseSagaP<C extends SagaCfg> = { name: ServiceK } & C['UseP'];
export type UseSagaL$P<C extends SagaCfg> = { name: ServiceK } & C['L$P'];

// FROM COORDS =============================================================================================================================

export type FromCoordsC<Done = Maybe<Po>, Fail = null> = SagaCfg<Coords, Maybe<Po>, Done, Fail>;

// FROM VALUE ==============================================================================================================================

export interface FromValueO {
  fields?: any[];
}

export type FromValueC<Done = Po, Fail = null> = SagaCfg<string, Po, Done, Fail, FromValueO>;

// PROPOSALS FROM INPUT ====================================================================================================================

export interface ProposalsFromInputO {
  countries?: string[];
  type?: ProposalType;
}

export type ProposalsFromInputC<Done = Proposal[], Fail = null> = SagaCfg<string, Proposal[], Done, Fail, ProposalsFromInputO>;
