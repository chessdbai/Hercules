import * as cdk from '@aws-cdk/core';
import * as r53 from '@aws-cdk/aws-route53';
import * as certs from '@aws-cdk/aws-certificatemanager';
import { Website } from './website';

interface WebsiteStackProps extends cdk.StackProps {
  domainName: string,
  publicZoneId: string
}

export class WebsiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: WebsiteStackProps) {
    super(scope, id, props);

    const publicZone = r53.PublicHostedZone.fromLookup(this, 'PublicZone', {
      domainName: props.domainName
    });

    const publicZone = r53.PublicHostedZone.fromHostedZoneId(this, 'PublicZone', props.publicZoneId);

    const websiteCertArn = cdk.Fn.importValue('WebsiteCertArn');
    const websiteCert = certs.Certificate.fromCertificateArn(this, 'WebsiteCert', websiteCertArn);

    new Website(this, 'Website', {
      domainName: props.domainName,
      websiteCertificate: websiteCert,
      publicZone: publicZone
    });
  }
}
