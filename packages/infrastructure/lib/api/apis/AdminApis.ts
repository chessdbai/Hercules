import { Construct } from '@aws-cdk/core';
import { 
  Method, LambdaIntegration,
  AuthorizationType, Model, JsonSchemaType
} from '@aws-cdk/aws-apigateway';

import { 
  createRequestTemplates,
  CommonApiProps,
  methodResponseForApiError,
  integrationResponseForApiError,
  methodResponseForModel,
  CORS_HEADERS
} from './api-common';
import {
  ApiError,
  makeApiError
} from './CommonModels';

export interface AdminApisProps extends CommonApiProps { }

export class AdminApis extends Construct {

  readonly methods : Method[];

  readonly userNotFoundError : ApiError;

  constructor(scope: Construct, id: string, props: AdminApisProps) {
    super(scope, id);

    this.userNotFoundError = makeApiError(
      this,
      props,
      'UserNotFoundError',
      'The specified user was not found.',
      404
    );

    const exercisesResource = props.api.root.addResource('admin');
    const userResource = exercisesResource.addResource('user');

    const initializeUserRequestModel = AdminApis.createInitializeUserRequestModel(this, props);
    const initializeUserResponseModel = AdminApis.createInitializeUserResponseModel(this, props);
    const initializeUserMethod = userResource.addMethod('PUT', new LambdaIntegration(props.serviceLambda, {
      requestTemplates: {
        'application/json': createRequestTemplates('InitializeUser', AuthorizationType.IAM)
      },
      integrationResponses: [
        {
          statusCode: '200',
          responseParameters: CORS_HEADERS
        },
        integrationResponseForApiError(this.userNotFoundError)
      ],
      proxy: false
    }), {
      authorizationType: AuthorizationType.IAM,
      requestModels: {
        'application/json': initializeUserRequestModel
      },
      methodResponses: [
        methodResponseForModel(initializeUserResponseModel),
        methodResponseForApiError(this.userNotFoundError)
      ],
      requestValidator: props.requestValidator
    });

    this.methods = [
      initializeUserMethod
    ];
  }

  static createInitializeUserRequestModel(construct: Construct, props: AdminApisProps) : Model {
    return new Model(construct, 'InitializeUserRequestModel', {
      restApi: props.api,
      modelName: 'InitializeUserRequest',
      contentType: 'application/json',
      schema: {
        title: 'InitializeUserRequest',
        description: 'Input to InitializeUser API',
        properties: {
          'Username': {
            type: JsonSchemaType.STRING
          },
          'InitialGroup': {
            type: JsonSchemaType.STRING
          }
        },
        required: [
          'Username',
          'InitialGroup'
        ]
      }
    })
  }

  static createInitializeUserResponseModel(construct: Construct, props: AdminApisProps) : Model {
    return new Model(construct, 'InitializeUserResponseModel', {
      restApi: props.api,
      modelName: 'InitializeUserResponse',
      contentType: 'application/json',
      schema: {
        title: 'InitializeUserResponse',
        description: 'Input to InitializeUser API',
        properties: {
        }
      }
    })
  }
}
