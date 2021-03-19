import * as cdk from '@aws-cdk/core';
import * as apig from '@aws-cdk/aws-apigateway';

import {
  CORS_HEADERS,
  integrationResponseForApiError,
  methodResponseForModel,
  methodResponseForApiError, CommonApiProps
} from '../../api-common';
import { MyGameApiProps } from './GameApis';


export const createPgnRequestTemplate = (apiName: string, authType: apig.AuthorizationType) => {
  const authTypeVar = authType == apig.AuthorizationType.IAM
    ? '$context.identity.caller'
    : `$context.authorizer.claims['cognito:username']`; 
    return '' +
`{
  "Requester": "${authTypeVar}",
  "RequestId": "$context.extendedRequestId",
  "ApiName": "${apiName}",
  "InputObject": {
    "Path": "$input.params('path')",
    "EncodedGamePgn": "$input.body"
  }
}`
}

export class PutGameApi extends cdk.Construct {

  readonly method : apig.Method;

  constructor(construct: cdk.Construct, id: string, props: MyGameApiProps) {
    super(construct, id);

    const putGameResponseModel = PutGameApi.createPutGameResponseModel(this, props);
    this.method = props.myGameResource.addMethod('PUT', new apig.LambdaIntegration(props.serviceLambda, {
      requestTemplates: {
        'application/x-chess-pgn': createPgnRequestTemplate('PutGame', apig.AuthorizationType.COGNITO)
      },
      contentHandling: apig.ContentHandling.CONVERT_TO_TEXT,
      integrationResponses: [
        {
          statusCode: '200',
          responseParameters: CORS_HEADERS
        },
        integrationResponseForApiError(props.gameModels.invalidPgnFormatError),
        integrationResponseForApiError(props.gameModels.gamePathNotFoundError),
        integrationResponseForApiError(props.gameModels.duplicateGameError),
      ],
      proxy: false
    }), {
      authorizationType: apig.AuthorizationType.COGNITO,
      authorizer: props.authorizer,
      requestParameters: {
        'method.request.querystring.path': true
      },
      methodResponses: [
        methodResponseForModel(putGameResponseModel),
        methodResponseForApiError(props.gameModels.invalidPgnFormatError),
        methodResponseForApiError(props.gameModels.gamePathNotFoundError),
        methodResponseForApiError(props.gameModels.duplicateGameError)
      ]
    });
  }

  static createPutGameResponseModel(construct: cdk.Construct, props: MyGameApiProps) : apig.Model {
    return new apig.Model(construct, 'PutGameResponseModel', {
      restApi: props.api,
      modelName: 'PutGameResponse',
      contentType: 'application/json',
      schema: {
        title: 'PutGameResponse',
        description: 'Input to PutGame API',
        properties: {
          'DatabaseObjectId': {
            type: apig.JsonSchemaType.STRING
          }
        },
        required: [
          'DatabaseObjectId'
        ]
      }
    })
  }
}