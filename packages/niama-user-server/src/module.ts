import { DynamicModule, Module, Type } from '@nestjs/common';
import { User as UserBase } from '@niama/user';

import { UserRS } from './api.resolver';

@Module({})
export class UserMD {
  static forRoot<Role extends string, User extends UserBase<Role>, RS extends UserRS<Role, User>>(resolverClass?: Type<RS>): DynamicModule {
    return {
      module: UserMD,
      providers: [{ provide: 'UserRS', useClass: resolverClass || UserRS }],
    };
  }
}
