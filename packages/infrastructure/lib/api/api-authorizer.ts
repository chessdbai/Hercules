import { Construct, Token } from '@aws-cdk/core';
import { 
  IAuthorizer, CfnAuthorizer, RestApi
} from '@aws-cdk/aws-apigateway';
export interface ApiAuthorizerProps {
  api: RestApi,
  userPoolArn: string
}

export class ApiAuthorizer extends Construct {

  readonly authorizer : IAuthorizer;

  constructor(scope: Construct, id: string, props: ApiAuthorizerProps) {
    super(scope, id);

    const cfnAuthorizer = new CfnAuthorizer(this, 'Authorizer', {
      name: 'CognitoAuthorizer',
      identitySource: 'method.request.header.Authorization',
      restApiId: props.api.restApiId,
      type: 'COGNITO_USER_POOLS',
      providerArns: [props.userPoolArn]
    });

    this.authorizer = {
      authorizerId: Token.asString(cfnAuthorizer.ref)
    };
  }

}