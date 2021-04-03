#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import * as stacks from '../lib/';
import * as accounts from '../lib/accounts';

const DeployAccountId = accounts.DeployAccountEnv.account!;

const app = new cdk.App();

accounts.ACCOUNTS.forEach(account => {
  const suffix = `Stack-${account.stage}`;
  const env : cdk.Environment = {
    account: account.accountId,
    region: account.region
  };
  new stacks.CoreStack(app, `Core${suffix}`, {
    account: account
  });
  const authStack = new stacks.AuthStack(app, `Auth${suffix}`, {
    account: account
  });
  new stacks.AuthTestStack(app, `AuthTest${suffix}`, {
    account: account
  });
  new stacks.WebsiteStack(app, `Website${suffix}`, {
    account: account
  });
  new stacks.ApiStack(app, `Api${suffix}`, {
    account: account
  });
});

new stacks.CicdStack(app, `HerculesCicd`, {
  env: accounts.DeployAccountEnv,
  accounts: accounts.ACCOUNTS
});