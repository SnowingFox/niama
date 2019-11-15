import { CognitoUser } from '@aws-amplify/auth';
import { NiamaProvider as BaseNiamaProvider } from '@niama/core/types';

import * as Base from '../../types';

export * from '@niama/auth/types';
export * from '../../types/main';
export * from '../../types/service';

// CONFIG ==================================================================================================================================

export interface Config<IRole extends string = string, ISignup extends Base.Signup = Base.Signup, ISignupDto extends SignupDto = SignupDto> {
  CurrentDto: CurrentDto;
  Role: IRole;
  Signup: ISignup;
  SignupDto: ISignupDto;
}

// PROVIDER ================================================================================================================================

export interface NiamaProvider extends BaseNiamaProvider {
  auth: Provider;
}

export interface Provider<C extends Config = Config> extends Base.ProviderO<C>, Base.ProviderRequiredO<C> {
  current: Base.Current<CurrentDto, C['Role']>;
}

// OBJECTS =================================================================================================================================

interface CurrentDto extends CognitoUser {
  attributes: { email: string; email_verified: boolean; sub: string; [id: string]: string | number | boolean };
  username: string;
}

export interface SignupDto<Attrs extends object = {}> extends Base.Signup {
  attributes?: Attrs;
}
