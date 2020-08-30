import { Construct } from '@aws-cdk/core';
import { 
  Method, LambdaIntegration,
  AuthorizationType, JsonSchemaType, Model
} from '@aws-cdk/aws-apigateway';
import { CommonApiProps, createRequestTemplates } from './api-common';

export interface HealthApisProps extends CommonApiProps {
}

export class HealthApis extends Construct {

  readonly methods : Method[];

  constructor(scope: Construct, id: string, props: HealthApisProps) {
    super(scope, id);

    const healthResource = props.api.root.addResource('health');
    healthResource.addCorsPreflight({
      allowCredentials: true,
      allowOrigins: ['*'],
      allowHeaders: ['*'],
      allowMethods: ['ANY']
    });

    const getSessionResponseModel = HealthApis.createGetSessionResponseModel(this, props);
    const getSessionMethod = healthResource.addMethod('GET', new LambdaIntegration(props.serviceLambda, {
      requestTemplates: {
        'application/json': createRequestTemplates('GetSession', AuthorizationType.IAM)
      },
      integrationResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
            'method.response.header.Access-Control-Allow-Methods': "'*'",
            'method.response.header.Access-Control-Allow-Origin' : "'*'"
          }
        }
      ],
      proxy: false
    }), {
      authorizer: props.authorizer,
      authorizationType: AuthorizationType.COGNITO,
      methodResponses: [
        {
          statusCode: '200',
          responseModels: {
            'application/json': getSessionResponseModel
          },
          responseParameters: {
            'method.response.header.Access-Control-Allow-Headers': true,
            'method.response.header.Access-Control-Allow-Methods': true,
            'method.response.header.Access-Control-Allow-Origin' : true
          }
        }
      ],
      requestValidator: props.requestValidator
    });

    this.methods = [getSessionMethod];
  }

  static createGetSessionResponseModel(construct: Construct, props: HealthApisProps) : Model {
    return new Model(construct, 'GetSessionResponseModel', {
      restApi: props.api,
      modelName: 'GetSessionResponse',
      contentType: 'application/json',
      schema: {
        title: 'GetSessionResponse',
        description: 'Output from GetSessionResponse API',
        properties: {
          'Username': {
            type: JsonSchemaType.STRING
          }
        },
        required: [
          'Username'
        ]
      }
    })
  }
}
