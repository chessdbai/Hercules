import * as cdk from '@aws-cdk/core';
import * as r53 from '@aws-cdk/aws-route53';
import * as certs from '@aws-cdk/aws-certificatemanager';

interface CoreStackProps extends cdk.StackProps {
  domainName: string
}

export class CoreStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: CoreStackProps) {
    super(scope, id, props);
    
    const publicZone = r53.PublicHostedZone.fromLookup(this, 'PublicZone', {
      domainName: props.domainName
    });

    const apiCert = new certs.DnsValidatedCertificate(this, 'ApiCert', {
      region: 'us-east-2',
      hostedZone: publicZone,
      domainName: `api.${props.domainName}`
    });
    const websiteCert = new certs.DnsValidatedCertificate(this, 'WebsiteCert', {
      region: 'us-east-1',
      hostedZone: publicZone,
      domainName: `${props.domainName}`,
      subjectAlternativeNames: [
        `www.${props.domainName}`
      ]
    });

    new cdk.CfnOutput(this, 'ApiCertArnOutput', {
      exportName: 'ApiCertArn',
      value: apiCert.certificateArn
    });
    new cdk.CfnOutput(this, 'WebsiteCertArnOutput', {
      exportName: 'WebsiteCertArn',
      value: websiteCert.certificateArn
    });
  }
}
