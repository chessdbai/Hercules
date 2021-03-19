import * as cdk from '@aws-cdk/core';
import { ShimHostedZone } from '../shim-hosted-zone';
import * as certs from '@aws-cdk/aws-certificatemanager';
import { HerculesAccount } from '../accounts';
import { Website } from './website';

interface WebsiteStackProps {
  account: HerculesAccount
}

export class WebsiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: WebsiteStackProps) {
    super(scope, id, {
      env: {
        account: props.account.accountId,
        region: props.account.region
      }
    });

    const publicZone = new ShimHostedZone(this, 'PublicZone', {
      hostedZoneId: props.account.publicZoneId,
      zoneName: props.account.domainName
    });

    const websiteCertArn = cdk.Fn.importValue('WebsiteCertArn');
    const websiteCert = certs.Certificate.fromCertificateArn(this, 'WebsiteCert', websiteCertArn);

    new Website(this, 'Website', {
      domainName: props.account.domainName,
      websiteCertificate: websiteCert,
      publicZone: publicZone
    });
  }
}
