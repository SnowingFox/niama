import { AsyncSubject, Maybe, Observable, Syncer } from '@niama/core/types';

import { BootO, Raw } from './';
import { Hint, Po } from './main';
import * as S from './service';

// BOOT ====================================================================================================================================

export interface BootAddressP {
  initProvider: Syncer<Provider, BootO>;
  opts: BootO;
}

// PROVIDER ================================================================================================================================

export interface Provider extends Services, ServiceO {}

// RAW =====================================================================================================================================

export interface RawConfig {
  $: AsyncSubject<Raw>;
  loading: boolean;
}

// SERVICES ================================================================================================================================

export interface ServiceO {
  opts: BootO;
  raw: RawConfig;
}

export interface Services {
  fromCoords: <Done = Maybe<Po>, Fail = null>(p: S.FromCoordsP<Done, Fail>) => S.FromCoordsR<Done, Fail>;
  fromValue: <Done = Po, Fail = null>(p: S.FromValueP<Done, Fail>) => S.FromValueR<Done, Fail>;
  hintsFromInput: <Done = Hint[], Fail = null>(p: S.HintsFromInputP<Done, Fail>) => S.HintsFromInputR<Done, Fail>;
  init$: Observable<Raw>;
}
