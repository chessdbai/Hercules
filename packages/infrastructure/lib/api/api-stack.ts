import * as cdk from '@aws-cdk/core';
import * as r53 from '@aws-cdk/aws-route53';
import * as certs from '@aws-cdk/aws-certificatemanager';
import { ApiLambda } from './api-lambda';
import { ApiEndpoint } from './api-endpoint';

interface ApiStackProps extends cdk.StackProps {
  domainName: string,
  publicZoneId: string
}

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    
    const userPoolId = cdk.Fn.importValue('UserPoolId');
    const userPoolArn = cdk.Fn.importValue('UserPoolArn');

    const serviceLambda = new ApiLambda(this, 'Service', {
      userPoolArn: userPoolArn,
      userPoolId: userPoolId,
      provisionedInstances: 1
    });
    
    const publicZone = r53.PublicHostedZone.fromHostedZoneId(this, 'PublicZone', props.publicZoneId);

    const apiCertArn = cdk.Fn.importValue('ApiCertArn');
    const apiCert = certs.Certificate.fromCertificateArn(this, 'ApiCert', apiCertArn); 
    new ApiEndpoint(this, 'Api', {
      serviceLambda: serviceLambda.apiLambda,
      domainName: 'api.' + props.domainName,
      userPoolArn: userPoolArn,
      certificate: apiCert,
      hostedZone: publicZone
    });
  }
}
