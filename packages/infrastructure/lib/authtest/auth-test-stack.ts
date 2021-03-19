import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as ses from '@aws-cdk/aws-ses';
import * as ses_actions from '@aws-cdk/aws-ses-actions';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as custom from '@aws-cdk/custom-resources';
import * as path from 'path';
import * as fs from 'fs';
import { HerculesAccount } from '../accounts';

interface AuthTestStackProps {
  account: HerculesAccount
}

export class AuthTestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AuthTestStackProps) {
    super(scope, id, {
      env: {
        account: props.account.accountId,
        region: 'us-east-1'
      }
    });

    const table = new ddb.Table(this, 'Table', {
      partitionKey: {
        type: ddb.AttributeType.STRING,
        name: 'testName'
      },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST
    });

    const receiptLambda = new lambda.Function(this, 'MyLambda', {
      code: lambda.Code.fromInline(path.join(__dirname, 'emailReceiver.py')),
      handler: 'index.main',
      runtime: lambda.Runtime.PYTHON_3_6,
      environment: {
        'EMAIL_RECEIPT_TABLE': table.tableArn
      }
    });

    const integTestRuleSet = new ses.ReceiptRuleSet(this, 'Ruleset', {
      receiptRuleSetName: 'integ-test',
    });
    integTestRuleSet.addRule('routeTestEmailRule', {
      recipients: [
        `integ-test@${props.account.domainName}`
      ],
      actions: [
        new ses_actions.Lambda({
          function: receiptLambda
        })
      ]
    });

  }
}
