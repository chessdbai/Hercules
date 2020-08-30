#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import * as stacks from '../lib/';
import * as accounts from '../lib/accounts';

const app = new cdk.App();

accounts.ACCOUNTS.forEach(account => {
  const suffix = `Stack-${account.stage}`;
  const env : cdk.Environment = {
    account: account.accountId,
    region: account.region
  };
  new stacks.CoreStack(app, `Core${suffix}`, {
    env: env,
    domainName: account.domainName
  });
  new stacks.AuthStack(app, `Auth${suffix}`, {
    env: env,
    domainName: account.domainName,
    replyToEmail: account.replyToEmail,
    replyToEmailArn: account.replyToEmailArn
  });
  new stacks.WebsiteStack(app, `Website${suffix}`, {
    env: env,
    domainName: 'chessdb.ai'
  });
  new stacks.ApiStack(app, `Api${suffix}`, {
    env: env,
    domainName: 'chessdb.ai'
  });
});

new stacks.CicdStack(app, `CicdStack`, {
  env: accounts.DeployAccountEnv,
  accounts: accounts.ACCOUNTS
});