import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { User as UserBase } from '@niama/user';

import { UserS } from './service';

@Global()
@Module({})
export class UserServicesMD {
  static forRoot<Role extends string, User extends UserBase<Role>, Service extends UserS<Role, User>>(
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
