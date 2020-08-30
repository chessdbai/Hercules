import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';

export interface TriggersProps {
}

export class Triggers extends cdk.Construct {

  readonly lambdaFunction: lambda.IFunction;

  constructor(scope: cdk.Construct, id: string, props: TriggersProps) {
    super(scope, id);

    this.lambdaFunction = new lambda.Function(this, 'Service', {
      runtime: lambda.Runtime.PROVIDED, // So we can use async in widget.js
      code: lambda.Code.asset('../triggers/dist/Hercules.Triggers.zip'),
      handler: "widgets.main",
      memorySize: 2048,
      timeout: cdk.Duration.minutes(1)
    });

    const invokePolicy = new iam.PolicyStatement();
    invokePolicy.addActions("execute-api:Invoke");
    invokePolicy.addAllResources();
    this.lambdaFunction.addToRolePolicy(invokePolicy);

  }
}