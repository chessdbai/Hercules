import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as ec2 from '@aws-cdk/aws-ec2';
import AccountManager, { ZeusCorpAccount } from '@chessdb.biz/zeus-accounts';

import { Ipv6Workaround } from './ipv6-workaround';

const corpAccount : ZeusCorpAccount = AccountManager.getAccounts({
  stages: ['Corp']
})[0] as ZeusCorpAccount;
const corpTopology = corpAccount.topology!;

interface CoreVpcProps {
  azCount: number
}

export class CoreVpc extends cdk.Construct {

  readonly vpc : ec2.Vpc;
  readonly ipv6 : Ipv6Workaround;
  readonly esSlr : iam.CfnServiceLinkedRole;

  constructor(parent: cdk.Construct, name: string, props: CoreVpcProps) {
    super(parent, name);

    this.vpc = new ec2.Vpc(this, 'Vpc', {
      maxAzs: props.azCount
    });
    this.vpc.addGatewayEndpoint('S3', {
      service: ec2.GatewayVpcEndpointAwsService.S3
    });
    this.vpc.addGatewayEndpoint('DDB', {
      service: ec2.GatewayVpcEndpointAwsService.DYNAMODB
    });

    this.ipv6 = new Ipv6Workaround(this, 'IPv6', {
      vpc: this.vpc,
    });

    const peering = new ec2.CfnVPCPeeringConnection(this, 'CorpPeering', {
      peerRegion: corpTopology.vpcRegion,
      peerVpcId: corpTopology.vpcId,
      peerOwnerId: corpAccount.accountId,
      peerRoleArn: corpTopology.peeringRoleArn,
      vpcId: this.vpc.vpcId
    });
    peering.addDependsOn(this.ipv6.ipv6Resource);

    this.esSlr = new iam.CfnServiceLinkedRole(this, 'ElasticSearchSLR', {
      awsServiceName: 'es.amazonaws.com'
    });
  }
}