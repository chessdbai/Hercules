import * as cdk from '@aws-cdk/core';
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

    const approvalTopicArn = cdk.Fn.importValue('PlumberApprovalsTopicArn');
    const notificationsTopicArn = cdk.Fn.importValue('PlumberNotificationsTopicArn');
    
    const herculesRepo = new codecommit.Repository(this, 'Repo', {
      repositoryName: 'hercules'
    });

    const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
      pipelineName: 'Hercules',

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

    const deployProject = new codebuild.PipelineProject(this, 'DeployProject', {

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

  }
}
