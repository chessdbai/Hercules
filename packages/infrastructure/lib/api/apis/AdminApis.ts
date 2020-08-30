import { Construct } from '@aws-cdk/core';
import { 
  Method, LambdaIntegration,
  AuthorizationType, Model, JsonSchemaType
} from '@aws-cdk/aws-apigateway';

import { 
  createRequestTemplates,
  CommonApiProps,
  methodResponseForErrorCode,
  integrationResponseForErrorCode,
  methodResponseForModel,
  CORS_HEADERS
} from './api-common';

export interface AdminApisProps extends CommonApiProps { }

export class AdminApis extends Construct {

  readonly methods : Method[];

  constructor(scope: Construct, id: string, props: AdminApisProps) {
    super(scope, id);

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
        integrationResponseForErrorCode('400')
      ],
      proxy: false
    }), {
      authorizationType: AuthorizationType.IAM,
      requestModels: {
        'application/json': initializeUserRequestModel
      },
      methodResponses: [
        methodResponseForModel(initializeUserResponseModel),
        methodResponseForErrorCode('400')
      ],
      requestValidator: props.requestValidator
    });

    const deleteUserDataRequestModel = AdminApis.createDeleteUserDataRequestModel(this, props);
    const deleteUserDataResponseModel = AdminApis.createDeleteUserDataResponseModel(this, props);
    const deleteUserDataMethod = userResource.addMethod('DELETE', new LambdaIntegration(props.serviceLambda, {
      requestTemplates: {
        'application/json': createRequestTemplates('DeleteUserData', AuthorizationType.IAM)
      },
      integrationResponses: [
        {
          statusCode: '200',
          responseParameters: CORS_HEADERS
        },
        integrationResponseForErrorCode('400')
      ],
      proxy: false
    }), {
      authorizationType: AuthorizationType.IAM,
      requestModels: {
        'application/json': deleteUserDataRequestModel
      },
      methodResponses: [
        methodResponseForModel(deleteUserDataResponseModel),
        methodResponseForErrorCode('400')
      ],
      requestValidator: props.requestValidator
    });    

    this.methods = [
      initializeUserMethod,
      deleteUserDataMethod
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


  static createDeleteUserDataRequestModel(construct: Construct, props: AdminApisProps) : Model {
    return new Model(construct, 'DeleteUserDataRequestModel', {
      restApi: props.api,
      modelName: 'DeleteUserDataRequest',
      contentType: 'application/json',
      schema: {
        title: 'DeleteUserDataRequest',
        description: 'Input to DeleteUserData API',
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

  static createDeleteUserDataResponseModel(construct: Construct, props: AdminApisProps) : Model {
    return new Model(construct, 'DeleteUserDataResponseModel', {
      restApi: props.api,
      modelName: 'DeleteUserDataResponse',
      contentType: 'application/json',
      schema: {
        title: 'DeleteUserDataResponse',
        description: 'Output from DeleteUserData API',
        properties: {
        }
      }
    })
  }  
}
