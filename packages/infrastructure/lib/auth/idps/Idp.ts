
import { IUserPoolIdentityProvider } from '@aws-cdk/aws-cognito';

export interface Idp extends IUserPoolIdentityProvider {

  readonly usernameAttribute: string;
}