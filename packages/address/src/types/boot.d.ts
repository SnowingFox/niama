import { BootO, Raw } from '@niama/address/types';
import { GetBootCfg, GetBootP, GetBootSagaP, GetRawCfg, GetServiceO, Maybe, Observable } from '@niama/core/types';

import { Hint, Po } from './main';
import * as S from './services';

// CONFIG===================================================================================================================================

export type BootCfg = GetBootCfg<BootO, Provider, Raw, Services>;
export type BootAddressP = GetBootP<BootCfg>;
export type RawCfg = GetRawCfg<BootCfg>;
export type ServiceO = GetServiceO<BootCfg>;
export type BootSagaP<Done, Res, Src, Fail = null> = GetBootSagaP<BootCfg, Done, Res, Src, Fail>;

// PROVIDER ================================================================================================================================

export interface Provider extends Services, ServiceO {}

// SERVICES ================================================================================================================================

export interface Services {
  fromCoords: <Done = Maybe<Po>, Fail = null>(p: S.FromCoordsP<Done, Fail>) => S.FromCoordsR<Done, Fail>;
  fromValue: <Done = Po, Fail = null>(p: S.FromValueP<Done, Fail>) => S.FromValueR<Done, Fail>;
  hintsFromInput: <Done = Hint[], Fail = null>(p: S.HintsFromInputP<Done, Fail>) => S.HintsFromInputR<Done, Fail>;
  init$: Observable<Raw>;
}
