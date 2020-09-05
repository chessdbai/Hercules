import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';
import * as kms from '@aws-cdk/aws-kms';
import * as sns from '@aws-cdk/aws-sns';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codestarnotifications from '@aws-cdk/aws-codestarnotifications';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codecommit from '@aws-cdk/aws-codecommit';
import { HerculesAccount } from '../accounts';
import { BuildProject } from './build-project';

const friendlyName = (name: string) : string => {
  if (name.length == 0) return name;
  if (name.length == 1) return name.toUpperCase();

  var first = name[0].toUpperCase();
  return first + name.substring(1, name.length);
}

interface CicdStackProps extends cdk.StackProps {
  accounts: HerculesAccount[]
}

export class CicdStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: CicdStackProps) {
    super(scope, id, props);

    const myAccountPrincipal = new iam.AccountPrincipal(props.env!.account);
    const artifactKey = new kms.Key(this, 'ArtifactKey', {
      alias: 'hercules-artifact-key',
      enableKeyRotation: true
    });
    artifactKey.grantEncryptDecrypt(myAccountPrincipal);

    const approvalTopicArn = cdk.Fn.importValue('PlumberApprovalsTopicArn');
    const notificationsTopicArn = cdk.Fn.importValue('PlumberNotificationsTopicArn');

    const herculesRepo = new codecommit.Repository(this, 'Repo', {
      repositoryName: 'hercules'
    });

    const artifactBucket = new s3.Bucket(this, 'ArtifactBucket', {
      encryptionKey: artifactKey
    });
    artifactBucket.grantReadWrite(myAccountPrincipal);
    artifactBucket.grantDelete(myAccountPrincipal);

    const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
      pipelineName: 'Hercules',
      artifactBucket: artifactBucket
    });

    const sourceOutput = new codepipeline.Artifact('sourceOutput');
    const sourceStage = pipeline.addStage({
      stageName: 'Source'
    });
    sourceStage.addAction(new codepipeline_actions.CodeCommitSourceAction({
      repository: herculesRepo,
      actionName: 'Source',
      runOrder: 1,
      output: sourceOutput
    }));

    const buildProject = new BuildProject(this, 'BuildProject', {
      artifactKey: artifactKey
    });

    const buildOutput = new codepipeline.Artifact('buildOutput');
    const buildStage = pipeline.addStage({
      stageName: 'Build'
    });
    buildStage.addAction(new codepipeline_actions.CodeBuildAction({
      project: buildProject.project,
      input: sourceOutput,
      outputs: [
        buildOutput
      ],
      actionName: 'Build',
      runOrder: 1
    }));

    const deployRole = new iam.Role(this, 'DeployProjectRole', {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('codebuild.amazonaws.com'),
        new iam.ServicePrincipal('codebuild.amazonaws.com')
      )
    });
    const deployAssumeRolePolicy = new iam.PolicyStatement();
    deployAssumeRolePolicy.addActions('sts:AssumeRole');
    deployAssumeRolePolicy.addAllResources();
    deployRole.addToPolicy(deployAssumeRolePolicy);

    const deployProject = new codebuild.PipelineProject(this, 'DeployProject', {
      role: deployRole,
      encryptionKey: artifactKey,
      buildSpec: codebuild.BuildSpec.fromSourceFilename('packages/infrastructure/cdk.out/buildspec.yml')
    });

    props.accounts.forEach(acc => {
      const deployStage = pipeline.addStage({
        stageName: `Deploy${friendlyName(acc.stage)}`
      });
      var actions : codepipeline.IAction[] = [];

      const deployActionForStack = (stackName: string) : codepipeline.IAction => {
        const stackNameWithoutStack = friendlyName(stackName.replace('Stack', ''));
        return new codepipeline_actions.CodeBuildAction({
          project: deployProject,
          input: buildOutput,
          actionName: `Deploy${stackNameWithoutStack}`,
          environmentVariables: {
            'STACK_NAME': {
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
              value: `${stackName}-${acc.stage}`
            },
            'DESTINATION_REGION': {
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
              value: acc.region
            },
            'DESTINATION_ACCOUNT': {
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
              value: acc.accountId
            },
            'DEPLOYMENT_ROLE_ARN': {
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
              value: acc.deploymentRole
            }
          }
        });
      };

      
      const approvalActionForStack = (stackName: string) : codepipeline.IAction => {
        const stackNameWithoutStack = friendlyName(stackName.replace('Stack', ''));
        return new codepipeline_actions.ManualApprovalAction({
          actionName: `Approve${stackNameWithoutStack}`,
          notificationTopic: sns.Topic.fromTopicArn(this, `${acc.stage}ApprovalsTopic${stackNameWithoutStack}`, approvalTopicArn)
        });
      };

      const stackNames = [
        'CoreStack',
        'AuthStack',
        'WebsiteStack',
        'ApiStack',
      ];
      const lastStackName = stackNames[stackNames.length-1];

      stackNames.forEach(sn => {
        actions.push(deployActionForStack(sn));

        if (acc.stage.toLowerCase() === 'prod' || sn === lastStackName) {
          actions.push(approvalActionForStack(sn));
        }
      });

      for (var a = 0; a < actions.length; a++) {
        var action = actions[a];
        (action.actionProperties as any).runOrder = a + 1;
      }

      actions.forEach(a => {
        deployStage.addAction(a);
      });
    });

    new codestarnotifications.CfnNotificationRule(this, 'Notifications', {
      name: 'HerculesNotifications',
      status: 'ENABLED',
      resource: pipeline.pipelineArn,
      targets: [
        {
          targetType: 'SNS',
          targetAddress: notificationsTopicArn
        }
      ],
      detailType: 'FULL',
      eventTypeIds: [
        'codepipeline-pipeline-action-execution-succeeded',
        'codepipeline-pipeline-action-execution-failed',
        'codepipeline-pipeline-action-execution-canceled',
        'codepipeline-pipeline-action-execution-started',
        'codepipeline-pipeline-stage-execution-started',
        'codepipeline-pipeline-stage-execution-succeeded',
        'codepipeline-pipeline-stage-execution-resumed',
        'codepipeline-pipeline-stage-execution-canceled',
        'codepipeline-pipeline-stage-execution-failed',
        'codepipeline-pipeline-pipeline-execution-failed',
        'codepipeline-pipeline-pipeline-execution-canceled',
        'codepipeline-pipeline-pipeline-execution-started',
        'codepipeline-pipeline-pipeline-execution-resumed',
        'codepipeline-pipeline-pipeline-execution-succeeded',
        'codepipeline-pipeline-pipeline-execution-superseded',
        'codepipeline-pipeline-manual-approval-failed',
        'codepipeline-pipeline-manual-approval-needed',
        'codepipeline-pipeline-manual-approval-succeeded'
      ]
    });
  }
}
