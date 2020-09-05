import * as cdk from '@aws-cdk/core';
import AccountManager, { ZeusAccount, ZeusServiceAccount, ZeusCorpAccount } from '@chessdb.biz/zeus-accounts';

const betaAccount = AccountManager.getAccounts({
  stages: [ 'Beta' ],
  tag: 'Service'
})[0] as ZeusServiceAccount;
const prodAccount = AccountManager.getAccounts({
  stages: [ 'Prod' ],
  tag: 'Service'
})[0] as ZeusServiceAccount;
const deployAccount = AccountManager.getAccounts({
  tag: 'Deployment'
})[0] as ZeusCorpAccount;

export interface HerculesAccount {
  accountId: string,
  region: string,
  stage: string,
  domainName: string,
  replyToEmailArn: string,
  replyToEmail: string,
  publicZoneId: string,
  deploymentRole: string
}

const HerculesBeta : HerculesAccount = {
  accountId: betaAccount.accountId,
  region: betaAccount.region,
  stage: betaAccount.stage.toLowerCase(),
  domainName: 'beta.chessdb.biz',
  replyToEmailArn: 'arn:aws:ses:us-west-2:996734812344:identity/no-reply@beta.chessdb.biz',
  replyToEmail: 'no-reply@beta.chessdb.biz',
  publicZoneId: '/hostedzone/Z0115582UE0EG00XDYJ2',
  deploymentRole: betaAccount.deploymentRole
};

const HerculesProd : HerculesAccount = {
  accountId: prodAccount.accountId,
  region: prodAccount.region,
  stage: prodAccount.stage.toLowerCase(),
  domainName: 'chessdb.ai',
  replyToEmailArn: 'arn:aws:ses:us-east-1:541249553451:identity/no-reply@chessdb.ai',
  replyToEmail: 'no-reply@chessdb.ai',
  publicZoneId: '/hostedzone/Z00725913JABR2S4TT8ZI',
  deploymentRole: prodAccount.deploymentRole
};

const DeployAccountEnv : cdk.Environment = {
  account: deployAccount.accountId,
  region: deployAccount.region
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