import * as cdk from '@aws-cdk/core';

export interface HerculesAccount {
  accountId: string,
  region: string,
  stage: string,
  domainName: string,
  apiDomainName: string,
  replyToEmailArn: string,
  replyToEmail: string
}

const HerculesProd : HerculesAccount = {
  accountId: '541249553451',
  region: 'us-east-2',
  stage: 'prod',
  domainName: 'chessdb.ai',
  apiDomainName: 'api.chessdb.ai',
  replyToEmailArn: 'arn:aws:ses:us-east-1:541249553451:identity/no-reply@chessdb.ai',
  replyToEmail: 'no-reply@chessdb.ai'
};

const DeployAccountEnv : cdk.Environment = {
  account: '667342691845',
  region: 'us-east-2'
}

const ACCOUNTS = [
  HerculesProd 
];

export {
  HerculesProd,
  DeployAccountEnv,
  ACCOUNTS
};