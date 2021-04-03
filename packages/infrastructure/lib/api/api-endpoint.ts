import { Construct } from '@aws-cdk/core';
import { 
  IPublicHostedZone,
  ARecord,
  RecordTarget
} from '@aws-cdk/aws-route53';
import {
  ApiGatewayDomain
} from '@aws-cdk/aws-route53-targets';
import { 
  ICertificate
} from '@aws-cdk/aws-certificatemanager';
import { 
  RestApi,
  RequestValidator,
  DomainName,
  EndpointType,
  MethodLoggingLevel,
  Method
} from '@aws-cdk/aws-apigateway';
import { IFunction } from '@aws-cdk/aws-lambda';
import { ApiAuthorizer } from './api-authorizer';
import * as apis from './apis';

export interface ApiEndpointProps {
  hostedZone: IPublicHostedZone,
  certificate: ICertificate,
  userPoolArn: string,
  domainName: string,
  serviceLambda: IFunction
}

export class ApiEndpoint extends Construct {

  readonly methods: Method[];

  constructor(scope: Construct, id: string, props: ApiEndpointProps) {
    super(scope, id);

    const api = new RestApi(this, 'ZugzwangApi', {
      restApiName: 'ZugzwangStudyApi',
      binaryMediaTypes: [
        'application/x-chess-pgn'
      ],
      deployOptions: {
        loggingLevel: MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        metricsEnabled: true
      }
    });
    const requestValidator = new RequestValidator(this, 'Validator', {
      restApi: api,
      requestValidatorName: 'ModelValidator',
      validateRequestBody: true,
      validateRequestParameters: true
    });
    const customDomain = new DomainName(this, 'CustomDomain', {
      domainName: props.domainName,
      endpointType: EndpointType.REGIONAL,
      certificate: props.certificate
    });
    customDomain.addBasePathMapping(api, {});
    new ARecord(this, 'ApiDomainARecord', {
      target: RecordTarget.fromAlias(new ApiGatewayDomain(customDomain)),
      zone: props.hostedZone,
      recordName: 'api.' + props.domainName
    });

    const authorizer = new ApiAuthorizer(this, 'ApiAuthorizer', {
      userPoolArn: props.userPoolArn,
      api: api
    }).authorizer;

    const sharedModels = new apis.CommonModels(this, 'CommonModles', {
      api: api
    });
    const apiProps : apis.CommonApiProps = {
      api: api,
      authorizer: authorizer,
      serviceLambda: props.serviceLambda,
      requestValidator: requestValidator,
      models: sharedModels
    };


    const healthApis = new apis.HealthApis(this, 'Health', apiProps);
    
    this.methods = [
      ...healthApis.methods,
    ];
  }
}