import { CognitoUser as BaseCognitoUser } from '@aws-amplify/auth';

export interface CognitoUser extends BaseCognitoUser {
  attributes: { email: string; email_verified: boolean; sub: string; [id: string]: string | number | boolean };
  username: string;
}
