import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as kms from '@aws-cdk/aws-kms';
import * as r53 from '@aws-cdk/aws-route53';
import * as certs from '@aws-cdk/aws-certificatemanager';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';

interface CoreStackProps extends cdk.StackProps {
  domainName: string,
  stage: string
}

export class CoreStack extends cdk.Stack {

  readonly secretsPolicy : iam.ManagedPolicy;

  constructor(scope: cdk.Construct, id: string, props: CoreStackProps) {
    super(scope, id, props);
    
    const secretsKey = new kms.Key(this, 'Key', {
      alias: 'secret-protection-key',
      enableKeyRotation: true
    });

    const stripeSecret = new secretsmanager.Secret(this, 'Secret', {
      secretName: `/paymentToken/${props.stage}`,
      encryptionKey: secretsKey
    });
    
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
