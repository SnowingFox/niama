import * as Orm from '@niama/orm/types';

import * as Base from '../../types';

// CONFIG ==================================================================================================================================

export type Config = Orm.Config<Dto, F, Base.OB, Base.W>;

// FIELDS =================================================================================================================================

export type F = Names[];

// NAMES ===================================================================================================================================

export type Names = Base.Names | 'emailVerified';

export type InfoAttrsNames = 'email' | 'sub';

export type InfoAttrsNamesAddress =
  | 'address'
  | 'custom:addressCoords'
  | 'custom:addressData1'
  | 'custom:addressData2'
  | 'custom:addressData3'
  | 'custom:addressId'
  | 'custom:addressTypes';

// OBJECTS =================================================================================================================================

export interface Vo extends Base.Vo {
  emailVerified: boolean;
}

export interface Dto extends Base.Dto, Omit<Vo, Orm.NamesTime> {}

export interface Info<Attrs = InfoAttrs> {
  attrs: Attrs;
  username: string;
}

export type InfoAttrs = Record<InfoAttrsNames, string> & { email_verified: boolean };
export type InfoAttrsAddress = Record<InfoAttrsNamesAddress, string>;
