import { DynamicModule, Module, Type } from '@nestjs/common';

import { User as UserB } from '../universal/u.user.model.entity';
import { UserRS } from './b.user.service.resolver';

@Module({})
export class UserMD {
  static forRoot<Role extends string, User extends UserB<Role>, RS extends UserRS<Role, User>>(resolverClass?: Type<RS>): DynamicModule {
    return {
      module: UserMD,
      providers: [{ provide: 'UserRS', useClass: resolverClass || UserRS }],
    };
  }
}
