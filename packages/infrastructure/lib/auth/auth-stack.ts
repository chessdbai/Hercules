import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import { Auth } from './auth';
import { HerculesAccount } from '../accounts';

interface AuthStackProps {
  account: HerculesAccount
}

export class AuthStack extends cdk.Stack {

  readonly auth : Auth;

  constructor(scope: cdk.Construct, id: string, props: AuthStackProps) {
    super(scope, id, {
      env: {
        account: props.account.accountId,
        region: props.account.region
      }
    });

    const auth = new Auth(this, 'Auth', {
      account: props.account
    });

    new cdk.CfnOutput(this, 'UserPoolIdOutput', {
      exportName: 'UserPoolId',
      value: auth.userPool.userPoolId
    });
    new cdk.CfnOutput(this, 'UserPoolArnOutput', {
      exportName: 'UserPoolArn',
      value: auth.userPool.userPoolArn
    });
    new cdk.CfnOutput(this, 'UserPoolClientIdOutput', {
      exportName: 'UserPoolClientId',
      value: auth.client.userPoolClientId
    });
    new cdk.CfnOutput(this, 'IdentityPoolIdOutput', {
      exportName: 'IdentityPoolId',
      value: auth.identityPool.ref
    });


    new cdk.CfnOutput(this, 'FreeUsersRoleArnOutput', {
      exportName: 'FreeUsersRoleArn',
      value: auth.freeUsersRole.roleArn
    });
    new cdk.CfnOutput(this, 'PremiumUsersRoleArnOutput', {
      exportName: 'PremiumUsersRoleArn',
      value: auth.premiumUsersRole.roleArn
    });
    new cdk.CfnOutput(this, 'StaffUsersRoleArnOutput', {
      exportName: 'StaffUsersRoleArn',
      value: auth.staffUsersRole.roleArn
    });

    this.auth = auth;
  }
}
