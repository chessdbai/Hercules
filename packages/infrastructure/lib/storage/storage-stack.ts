import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as zugzwang from '@zugzwang-cdk/aws-clouddirectory';
import * as s3_assets from '@aws-cdk/aws-s3-assets';
import { Search } from './search';
import { Dir } from './dir';
import { HerculesAccount } from '../accounts';

interface StorageStackProps extends cdk.StackProps {
  account: HerculesAccount
}

export class StorageStack extends cdk.Stack {

  readonly directoryStorage : Dir;

  constructor(scope: cdk.Construct, id: string, props: StorageStackProps) {
    super(scope, id, {
      env: {
        account: props.account.accountId,
        region: props.account.region
      }
    });

    const serviceVpc = ec2.Vpc.fromLookup(this, 'ServiceVpc', {
      vpcId: props.account.vpcId
    });
    const searchCluster = new Search(this, 'Search', {
      vpc: serviceVpc,
      account: props.account,
      size: 'beta'
    });

    /*
    const directoryAsset = new s3_assets.Asset(this, "ZippedDirAsset", {
      path: 'schema/directory-schema.json'
    });
    this.directoryStorage = new Dir(this, 'Directory', {
      schemaAsset: directoryAsset
    });
    */

    new cdk.CfnOutput(this, 'DomainUrl', {
      exportName: 'ClusterDomainUrl',
      value: `https://${searchCluster.domainEndpoint}`
    })
  }
}
