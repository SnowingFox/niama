import { AuthStatus } from '@niama/auth';
import Chance from 'chance';

import { OrmR } from './types';

export abstract class OrmMock implements OrmR {
  // VARIABLES =============================================================================================================================

  abstract __typename: string;

  protected chance = new Chance();

  canDelete: string[] = [];
  canRead: string[] = [];
  canUpdate: string[] = [];
  canUpdateStatus: string[] = [];
  createdAt: string = this.chance.date({ string: true }) as string;
  id: string = this.chance.guid();
  label: string = this.chance.word();
  status: AuthStatus = 'OK';
  updatedAt: string = this.chance.date({ string: true }) as string;
}
