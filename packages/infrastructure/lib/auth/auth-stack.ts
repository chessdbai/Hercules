import * as cdk from '@aws-cdk/core';
import { Auth } from './auth';

interface AuthStackProps extends cdk.StackProps {
  domainName: string,
  replyToEmail: string,
  replyToEmailArn: string
}

export class AuthStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AuthStackProps) {
    super(scope, id, props);
    
    const auth = new Auth(this, 'Auth', {
      replyToEmail: props.replyToEmail,
      replyToEmailArn: props.replyToEmailArn,
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
  }
}
