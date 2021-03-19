import { 
  AuthorizationType, RestApi,
  IAuthorizer, RequestValidator,
  IntegrationResponse,
  MethodResponse, Model,
  JsonSchema, JsonSchemaVersion, JsonSchemaType
} from "@aws-cdk/aws-apigateway";
import { IFunction } from '@aws-cdk/aws-lambda';
import { CommonModels, ApiError } from './CommonModels';

export interface CommonApiProps {
  api: RestApi,
  serviceLambda: IFunction,
  authorizer: IAuthorizer,
  requestValidator: RequestValidator,
  models: CommonModels
}

export const createRequestTemplates = (apiName: string, authType: AuthorizationType) => {
  const authTypeVar = authType == AuthorizationType.IAM
    ? '$context.identity.caller'
    : `$context.authorizer.claims['cognito:username']`; 
    return '' +
`{
  "Requester": "${authTypeVar}",
  "RequestId": "$context.extendedRequestId",
  "ApiName": "${apiName}",
  "Input": "$util.escapeJavaScript($input.json('$'))"
}`
}

export const CORS_HEADERS = {
  'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
  'method.response.header.Access-Control-Allow-Methods': "'*'",
  'method.response.header.Access-Control-Allow-Origin' : "'*'"
};
export const CORS_PARAMETERS = {
  'method.response.header.Access-Control-Allow-Headers': true,
  'method.response.header.Access-Control-Allow-Methods': true,
  'method.response.header.Access-Control-Allow-Origin' : true
};

export const integrationResponseForApiError = (err: ApiError) : IntegrationResponse => {
  return {
    selectionPattern: `.*ErrorCode\":${err.statusCode}.*`,
    statusCode: err.statusCode.toString(),
    responseTemplates: {
      'application/json': `
#set ($errorMessageObj = $util.parseJson($input.path('$.errorMessage')))
{
"Type" : "$errorMessageObj.ErrorType",
"Message" : "$errorMessageObj.ErrorMessage",
"Code" : "$errorMessageObj.ErrorCode"
}`
    },
    responseParameters: {
      ...CORS_HEADERS,
      'method.response.header.x-amzn-ErrorType' : "integration.response.body.errorType"
    }
  }
};

export const methodResponseForApiError = (err: ApiError) : MethodResponse => {
  
  if (err.model !== undefined) {
    return {
      statusCode: err.statusCode.toString(),
      responseParameters: {
        ...CORS_PARAMETERS,
        'method.response.header.x-amzn-ErrorType' : true
      },
      responseModels: {
        'application/json': err.model!
      }
    };
  } else {
    return {
      statusCode: err.statusCode.toString(),
      responseParameters: {
        ...CORS_PARAMETERS,
        'method.response.header.x-amzn-ErrorType' : true
      }
    };
  }

}

export const methodResponseForModel = (model: Model) : MethodResponse => {
  return {
    statusCode: '200',
    responseModels: {
      'application/json': model
    },
    responseParameters: CORS_PARAMETERS
  };
}

export const makeModelForError = (title: string) : JsonSchema => {
  return {
    title: title,
    schema: JsonSchemaVersion.DRAFT7,
    properties: {
      Name: {
        type: JsonSchemaType.STRING
      },
      PrincipalVariation: {
        type: JsonSchemaType.STRING
      }
    }
  }
}
