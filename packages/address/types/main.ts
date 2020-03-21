import { AsyncSubject, Maybe, Observable, Syncer } from '@niama/core/types';

import { BootO, Service } from './';
import { Po, Proposal } from './objects';
import * as S from './service';

// BOOT ====================================================================================================================================

export interface BootP {
  initProvider: Syncer<Provider, BootO>;
  opts: BootO;
}

export interface ServiceCfg {
  $: AsyncSubject<Service>;
  loading: boolean;
}

// PROVIDER ================================================================================================================================

export interface Provider {
  service: ServiceCfg;
  opts: BootO;
  fromCoords: <Done = Maybe<Po>, Fail = null>(p: S.FromCoordsC<Done, Fail>['P']) => S.FromCoordsC<Done, Fail>['R'];
  fromValue: <Done = Po, Fail = null>(p: S.FromValueC<Done, Fail>['P']) => S.FromValueC<Done, Fail>['R'];
  init$: Observable<Service>;
  proposalsFromInput: <Done = Proposal[], Fail = null>(p: S.ProposalsFromInputC<Done, Fail>['P']) => S.ProposalsFromInputC<Done, Fail>['R'];
}
