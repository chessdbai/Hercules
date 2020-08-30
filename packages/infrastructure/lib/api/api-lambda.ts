import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as utils from './utils';

export interface ApiLambdaProps {
  userPoolArn: string,
  userPoolId: string,
  provisionedInstances?: number
}

export class ApiLambda extends cdk.Construct {

  readonly apiLambda: lambda.IFunction;
  readonly apiLambdaVersion: lambda.IFunction;
  readonly apiLambdaAlias: lambda.IFunction;

  constructor(scope: cdk.Construct, id: string, props: ApiLambdaProps) {
    super(scope, id);

    const lambdaPath = '../api-lambda/dist/Hercules.Api.zip';
    const lambdaId = utils.hashFile(lambdaPath);

    const executionRole = new iam.Role(this, 'ApiExecutionRole', {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('lambda.amazonaws.com'),
        new iam.AccountPrincipal(cdk.Aws.ACCOUNT_ID)
      )
    });

    const functionProps : lambda.FunctionProps = {
      runtime: lambda.Runtime.PROVIDED, // So we can use async in widget.js
      code: lambda.Code.asset(lambdaPath),
      handler: "widgets.main",
      memorySize: 3008,
      timeout: cdk.Duration.seconds(30),
      environment: {
        'USER_POOL_ID': props.userPoolId,
        'FUNCTION_HASH': lambdaId
      },
      role: executionRole
    }


    this.apiLambda = new lambda.Function(this, 'Service', {
      ...functionProps
    });

    const cognitoPolicy = new iam.PolicyStatement();
    cognitoPolicy.addActions("cognito-idp:AdminUpdateUserAttributes");
    cognitoPolicy.addActions("cognito-idp:AdminAddUserToGroup");
    cognitoPolicy.addActions("cognito-idp:AdminGetUser");
    cognitoPolicy.addResources(props.userPoolArn);
    
    executionRole.addToPolicy(cognitoPolicy);

    executionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));
    executionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaVPCAccessExecutionRole'));
    
    

    const version = new lambda.Version(this, 'LambdaVersion' + lambdaId, {
      lambda: (this.apiLambda as lambda.Function)
    });

    var aliasProps : lambda.AliasProps;
    if (props.provisionedInstances !== undefined && props.provisionedInstances! > 0) {
      aliasProps = {
        aliasName: 'prime',
        version: version
      };
    } else {
      aliasProps = {
        aliasName: 'prime',
        version: version,
        provisionedConcurrentExecutions: props.provisionedInstances!
      };
    }
    const alias = new lambda.Alias(this, 'LambdaAlias', aliasProps);
    this.apiLambdaVersion = version;
    this.apiLambdaAlias = alias;
  }
}