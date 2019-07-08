import { DynamicModule, Global, Module, Type } from '@nestjs/common';

import { User as UserB } from '../universal/u.user.model.entity';
import { UserS } from './b.user.service';

@Global()
@Module({})
export class UserServicesMD {
  static forRoot<Role extends string, User extends UserB<Role>, Service extends UserS<Role, User>>(
    serviceClass: Type<Service>,
    userClass: Type<User>
  ): DynamicModule {
    const service = { provide: 'UserS', useClass: serviceClass };
    const user = { provide: 'User', useValue: userClass };

    return {
      module: UserServicesMD,
      providers: [service, user],
      exports: [service, user],
    };
  }
}
