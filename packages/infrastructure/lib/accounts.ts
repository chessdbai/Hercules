import * as cdk from '@aws-cdk/core';

export interface HerculesAccount {
  accountId: string,
  region: string,
  stage: string,
  domainName: string,
  replyToEmailArn: string,
  replyToEmail: string
}

const HerculesBeta : HerculesAccount = {
  accountId: '996734812344',
  region: 'us-east-2',
  stage: 'beta',
  domainName: 'beta.chessdb.biz',
  replyToEmailArn: 'arn:aws:ses:us-west-2:996734812344:identity/no-reply@beta.chessdb.biz',
  replyToEmail: 'no-reply@beta.chessdb.biz'
};

const HerculesProd : HerculesAccount = {
  accountId: '541249553451',
  region: 'us-east-2',
  stage: 'prod',
  domainName: 'chessdb.ai',
  replyToEmailArn: 'arn:aws:ses:us-east-1:541249553451:identity/no-reply@chessdb.ai',
  replyToEmail: 'no-reply@chessdb.ai'
};

const DeployAccountEnv : cdk.Environment = {
  account: '667342691845',
  region: 'us-east-2'
}

const ACCOUNTS = [
  HerculesBeta,
  HerculesProd 
];

export {
  HerculesBeta,
  HerculesProd,
  DeployAccountEnv,
  ACCOUNTS
};