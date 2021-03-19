import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as kms from '@aws-cdk/aws-kms';
import * as es from '@aws-cdk/aws-elasticsearch';
import { HerculesAccount } from '../accounts';
import AccountManager, { ZeusCorpAccount } from '@chessdb.biz/zeus-accounts';

const corpAccount : ZeusCorpAccount = AccountManager.getAccounts({
  stages: ['Corp']
})[0] as ZeusCorpAccount;
const corpTopology = corpAccount.topology!;

type ClusterSize = 'prod' | 'beta';
const ClusterSizeScaleMap : {
  [index: string] : Partial<es.CfnDomainProps> 
} = {
  'prod': {
    elasticsearchClusterConfig: {
      instanceCount: 3,
      instanceType: 'c5.large.elasticsearch',
      dedicatedMasterEnabled: false,
      zoneAwarenessEnabled: true,
      zoneAwarenessConfig: {
        availabilityZoneCount: cdk.Fn.importValue('ServiceVpcZoneCount') as any
      }
    },
    domainEndpointOptions: {
      enforceHttps: true
    }
  },
  'beta': {
    elasticsearchClusterConfig: {
      instanceCount: 1,
      instanceType: 't3.small.elasticsearch',
      dedicatedMasterEnabled: false,
      zoneAwarenessEnabled: false
    },
    domainEndpointOptions: {
      enforceHttps: true
    }
  }
} 

interface SearchProps {
  vpc: ec2.IVpc,
  account: HerculesAccount,
  size: ClusterSize
}

export class Search extends cdk.Construct {

  readonly domainEndpoint : string;

  constructor(parent: cdk.Construct, name: string, props: SearchProps) {
    super(parent, name);

    const userPoolId = cdk.Fn.importValue('UserPoolId');
    const identityPoolId = cdk.Fn.importValue('IdentityPoolId');

    const clusterSuperAdminPrincipal = new iam.FederatedPrincipal(
      'cognito-identity.amazonaws.com',
      {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": identityPoolId
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        },
      },
    "sts:AssumeRoleWithWebIdentity");

    const freeUsersRole = iam.Role.fromRoleArn(this, 'FreeRole', cdk.Fn.importValue('FreeUsersRoleArn'));
    const premiumUsersRole = iam.Role.fromRoleArn(this, 'PremiumRole', cdk.Fn.importValue('PremiumUsersRoleArn'));
    const staffUsersRole = iam.Role.fromRoleArn(this, 'StaffRole', cdk.Fn.importValue('StaffUsersRoleArn'));
    const clusterSuperuserRole = new iam.Role(this, 'ClusterSuperuserRole', {
      assumedBy: clusterSuperAdminPrincipal
    });
    
    const encryptionKey = new kms.Key(this, 'Key', {
      alias: 'eunomia-datastore-encryption-key',
      enableKeyRotation: true
    });
    const domainName = 'eunomia-datastore';

    const searchClusterSecurityGroup = new ec2.SecurityGroup(this, 'SearchSecurityGroup', {
      vpc: props.vpc
    });
    var peers : ec2.IPeer[] = [
      ec2.Peer.ipv4(props.account.ipv4Space),
      ec2.Peer.ipv6(props.account.ipv6Space),
      ec2.Peer.ipv4(corpTopology.ipv4Space),
      ec2.Peer.ipv6(corpTopology.ipv6Space)
    ];
    peers.forEach(peer => {
      searchClusterSecurityGroup.addIngressRule(peer, ec2.Port.tcp(443));
      searchClusterSecurityGroup.addIngressRule(peer, ec2.Port.allIcmp());
    });
    

    const esCognitoRole = new iam.Role(this, 'SearchCognitoRole', {
      assumedBy: new iam.ServicePrincipal('es.amazonaws.com')
    });
    esCognitoRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonESCognitoAccess'));


    const noAwsAuthAccessPolicy = {
      "Version": "2012-10-17",
      "Statement": [{
        "Effect": "Allow",
        "Principal": {
          "AWS": "*"
        },
        "Action": [
          "es:ESHttp*"
        ],
        "Resource": `arn:aws:es::${cdk.Aws.ACCOUNT_ID}:domain/${domainName}/*`
      }]
    };

    const awsAuthAccessPolicy = {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": [
              "*"
            ]
          },
          "Action": [
            "es:ESHttp*"
          ],
          "Resource": `arn:aws:es::${cdk.Aws.ACCOUNT_ID}:domain/${domainName}/*`
        }
      ]
    };

    const scaleProperties = ClusterSizeScaleMap[props.size];
    const clusterConfig = scaleProperties.elasticsearchClusterConfig! as es.CfnDomain.ElasticsearchClusterConfigProperty;
    const subnetIds = cdk.Fn.split(';', cdk.Fn.importValue('ServiceVpcPrivateSubnets'));
    var subnetIdsToUse : string[] = [];
    for (var i = 0; i < clusterConfig.instanceCount!; i++) {
      subnetIdsToUse.push(cdk.Fn.select(i, subnetIds))
    }
    const vpcOptions : es.CfnDomain.VPCOptionsProperty = {
      securityGroupIds: [ searchClusterSecurityGroup.securityGroupId ],
      subnetIds: subnetIdsToUse
    }
    const cluster = new es.CfnDomain(this, 'Domain', {
      ...scaleProperties,
      accessPolicies: noAwsAuthAccessPolicy,
      advancedOptions: {

      },
      /*
      advancedSecurityOptions: {
        enabled: true,
        internalUserDatabaseEnabled: false,
        masterUserOptions: {
          masterUserArn: clusterSuperuserRole.roleArn
        }
      },
      cognitoOptions: {
        enabled: true,
        identityPoolId: identityPoolId,
        roleArn: esCognitoRole.roleArn,
        userPoolId: userPoolId,           
      },
      */
      domainName: domainName,
      ebsOptions: {
        ebsEnabled: true,
        volumeSize: 30,
        volumeType: 'gp2'
      },
      elasticsearchVersion: '7.7',
      elasticsearchClusterConfig: ClusterSizeScaleMap[props.size].elasticsearchClusterConfig!,
      encryptionAtRestOptions: {
        enabled: true,
        kmsKeyId: encryptionKey.keyArn
      },
      nodeToNodeEncryptionOptions: {
        enabled: true
      },
      snapshotOptions: {
        automatedSnapshotStartHour: 10
      },
      vpcOptions: vpcOptions,
    }); 

    const esArn = cdk.Token.asString(cluster.getAtt('DomainArn'));
    const elasticSearchPolicy = new iam.PolicyStatement();
    elasticSearchPolicy.addResources(
      esArn,
      `${esArn}/*`);
    elasticSearchPolicy.addActions('es:ESHttp*');
    clusterSuperuserRole.addToPolicy(elasticSearchPolicy);
    freeUsersRole.addToPolicy(elasticSearchPolicy);
    premiumUsersRole.addToPolicy(elasticSearchPolicy);
    staffUsersRole.addToPolicy(elasticSearchPolicy);

    this.domainEndpoint = cdk.Token.asString(cluster.getAtt('DomainEndpoint'));
  }
}