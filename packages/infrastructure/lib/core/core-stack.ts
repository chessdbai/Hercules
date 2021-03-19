import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as kms from '@aws-cdk/aws-kms';
import * as r53 from '@aws-cdk/aws-route53';
import * as certs from '@aws-cdk/aws-certificatemanager';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import { HerculesAccount } from '../accounts';

import { CoreVpc } from './core-vpc';

interface CoreStackProps {
  account: HerculesAccount
}

export class CoreStack extends cdk.Stack {

  readonly secretsPolicy : iam.ManagedPolicy;
  readonly network : ec2.Vpc;

  constructor(scope: cdk.Construct, id: string, props: CoreStackProps) {
    super(scope, id, {
      env: {
        account: props.account.accountId,
        region: props.account.region
      }
    });
    
    const secretsKey = new kms.Key(this, 'Key', {
      alias: 'secret-protection-key',
      enableKeyRotation: true
    });

    const stripeSecret = new secretsmanager.Secret(this, 'Secret', {
      secretName: `/paymentToken/${props.account.stage}`,
      encryptionKey: secretsKey
    });

    const azCount = props.account.stage.toLowerCase() !== 'prod' ? 2 : 3;
    this.network = new CoreVpc(this, 'Vpc', {
      azCount: azCount
    }).vpc;
    
    this.secretsPolicy = new iam.ManagedPolicy(this, 'SecretsManagedPolicy', {

    });
    const secretUsagePolicy = new iam.PolicyStatement();
    secretUsagePolicy.addActions(
      "secretsmanager:GetResourcePolicy",
      "secretsmanager:GetSecretValue",
      "secretsmanager:DescribeSecret",
      "secretsmanager:RestoreSecret",
      "secretsmanager:PutSecretValue",
      "secretsmanager:UpdateSecretVersionStage",
      "secretsmanager:CancelRotateSecret",
      "secretsmanager:ListSecretVersionIds",
      "secretsmanager:UpdateSecret"
    );
    secretUsagePolicy.addResources(stripeSecret.secretArn);

    const encryptionKeyPolicy = new iam.PolicyStatement();
    encryptionKeyPolicy.addActions(
      "kms:Decrypt",
      "kms:GenerateRandom",
      "kms:Encrypt",
      "kms:GenerateDataKey",
      "kms:GenerateDataKeyWithoutPlaintext",
      "kms:GenerateDataKeyPair"
    );
    encryptionKeyPolicy.addResources(secretsKey.keyArn);
    this.secretsPolicy.addStatements(secretUsagePolicy, encryptionKeyPolicy);

    const publicZone = r53.PublicHostedZone.fromLookup(this, 'PublicZone', {
      domainName: props.account.domainName
    });

    const authCert = new certs.DnsValidatedCertificate(this, 'AuthCert', {
      region: 'us-east-1',
      hostedZone: publicZone,
      domainName: `userauth.${props.account.domainName}`
    });
    const apiCert = new certs.DnsValidatedCertificate(this, 'ApiCert', {
      region: 'us-east-2',
      hostedZone: publicZone,
      domainName: `api.${props.account.domainName}`
    });
    const websiteCert = new certs.DnsValidatedCertificate(this, 'WebsiteCert', {
      region: 'us-east-1',
      hostedZone: publicZone,
      domainName: `${props.account.domainName}`,
      subjectAlternativeNames: [
        `www.${props.account.domainName}`
      ]
    });

    new cdk.CfnOutput(this, 'AuthCertArnOutput', {
      exportName: 'AuthCertArn',
      value: authCert.certificateArn
    });
    new cdk.CfnOutput(this, 'ApiCertArnOutput', {
      exportName: 'ApiCertArn',
      value: apiCert.certificateArn
    });
    new cdk.CfnOutput(this, 'WebsiteCertArnOutput', {
      exportName: 'WebsiteCertArn',
      value: websiteCert.certificateArn
    });

    var privateSubnetIds = this.network.privateSubnets.map(subnet => subnet.subnetId);
    var publicSubnetIds = this.network.publicSubnets.map(subnet => subnet.subnetId);

    new cdk.CfnOutput(this, 'ServiceVpcPrivateSubnetsOutput', {
      exportName: 'ServiceVpcPrivateSubnets',
      value: cdk.Fn.join(';', privateSubnetIds)
    });
    new cdk.CfnOutput(this, 'ServiceVpcPublicSubnetsOutput', {
      exportName: 'ServiceVpcPublicSubnets',
      value: cdk.Fn.join(';', publicSubnetIds)
    });
    new cdk.CfnOutput(this, 'ServiceVpcIdOutput', {
      exportName: 'ServiceVpcId',
      value: this.network.vpcId
    });
    new cdk.CfnOutput(this, 'ServiceVpcZoneCountOutput', {
      exportName: 'ServiceVpcZoneCount',
      value: azCount.toString()
    });
  }
}
