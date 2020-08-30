import { Construct } from '@aws-cdk/core';
import { 
  Method, LambdaIntegration,
  AuthorizationType, JsonSchemaType, Model
} from '@aws-cdk/aws-apigateway';
import { CommonApiProps } from './api-common';

export interface SearchApisProps extends CommonApiProps {
}

export class SearchApis extends Construct {

  readonly methods : Method[];

  constructor(scope: Construct, id: string, props: SearchApisProps) {
    super(scope, id);

    const searchResource = props.api.root.addResource('search');
    searchResource.addCorsPreflight({
      allowCredentials: true,
      allowOrigins: ['*'],
      allowHeaders: ['*'],
      allowMethods: ['ANY']
    });

    const naturalSearchResource = searchResource.addResource('natural');
    naturalSearchResource.addCorsPreflight({
      allowCredentials: true,
      allowOrigins: ['*'],
      allowHeaders: ['*'],
      allowMethods: ['ANY']
    });
    const naturalSearchResponseModel = SearchApis.createNaturalSearchResponseModel(this, props);
    const naturalSearchMethod = naturalSearchResource.addMethod('GET', new LambdaIntegration(props.serviceLambda, {
      requestTemplates: {
        'application/json' : `{
          "Requester": "$context.authorizer.claims['cognito:username']",
          "RequestId": "$context.extendedRequestId",
          "ApiName": "NaturalSearch",
          "InputObject": {
            "LanguageCode": "$method.request.querystring.l",
            "QueryText": "$method.request.querystring.q"
          }
        }`
      },
      requestParameters: {
        
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
            'application/json': naturalSearchResponseModel
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

    this.methods = [naturalSearchMethod];
  }

  static createNaturalSearchResponseModel(construct: Construct, props: SearchApisProps) : Model {
    return new Model(construct, 'NaturalSearchResponseModel', {
      restApi: props.api,
      modelName: 'NaturalSearchResponse',
      contentType: 'application/json',
      schema: {
        title: 'NaturalSearchResponse',
        description: 'Output from NaturalSearchResponse API',
        properties: {
          'LanguageCode': {
            type: JsonSchemaType.STRING
          },
          'QueryText': {
            type: JsonSchemaType.STRING
          }
        },
        required: [
          'LanguageCode',
          'QueryText'
        ]
      }
    })
  }
}
