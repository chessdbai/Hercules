import { Construct, Duration } from '@aws-cdk/core';
import { 
  Function, Runtime, Code
} from '@aws-cdk/aws-lambda';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export interface TriggersLambdaProps {
}

export class TriggersLambda extends Construct {

  readonly lambdaFunction: Function;

  constructor(scope: Construct, id: string, props: TriggersLambdaProps) {
    super(scope, id);

    this.lambdaFunction = new Function(this, 'Service', {
      runtime: Runtime.PROVIDED, // So we can use async in widget.js
      code: Code.asset('../apitriggers/dist/apitriggers.zip'),
      handler: "widgets.main",
      memorySize: 2048,
      timeout: Duration.minutes(1)
    });

    const invokePolicy = new PolicyStatement();
    invokePolicy.addActions("execute-api:Invoke");
    invokePolicy.addAllResources();
    //invokePolicy.addResources("arn:aws:execute-api:us-east-2:698701996991:0qfrjwz2kj/*/PUT/admin/user");
    this.lambdaFunction.addToRolePolicy(invokePolicy);

  }
}