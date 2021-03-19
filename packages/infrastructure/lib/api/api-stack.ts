import * as cdk from '@aws-cdk/core';
import * as certs from '@aws-cdk/aws-certificatemanager';
import { ApiLambda } from './api-lambda';
import { ApiEndpoint } from './api-endpoint';
import { ShimHostedZone } from '../shim-hosted-zone';
import { HerculesAccount } from '../accounts';


interface ApiStackProps extends cdk.StackProps {
  account: HerculesAccount
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
    
    const publicZone = new ShimHostedZone(this, 'PublicZone', {
      hostedZoneId: props.account.publicZoneId,
      zoneName: props.account.domainName
    });
    const apiCertArn = cdk.Fn.importValue('ApiCertArn');
    const apiCert = certs.Certificate.fromCertificateArn(this, 'ApiCert', apiCertArn); 
    new ApiEndpoint(this, 'Api', {
      serviceLambda: serviceLambda.apiLambda,
      domainName: 'api.' + props.account.domainName,
      userPoolArn: userPoolArn,
      certificate: apiCert,
      hostedZone: publicZone
    });
  }
}
