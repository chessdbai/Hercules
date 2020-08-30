import * as cdk from '@aws-cdk/core';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codecommit from '@aws-cdk/aws-codecommit';
import { HerculesAccount } from '../accounts';
import { BuildProject } from './build-project';

interface CicdStackProps extends cdk.StackProps {
  accounts: HerculesAccount[]
}

export class CicdStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: CicdStackProps) {
    super(scope, id, props);
    
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
        stageName: `${acc.stage}Deploy`
      });
      deployStage.addAction(new codepipeline_actions.CodeBuildAction({
        project: deployProject,
        input: buildOutput,
        actionName: `${acc.stage}DeployCore`,
        runOrder: 1
      }));
      deployStage.addAction(new codepipeline_actions.CodeBuildAction({
        project: deployProject,
        input: buildOutput,
        actionName: `${acc.stage}DeployAuth`,
        runOrder: 2
      }));
      deployStage.addAction(new codepipeline_actions.CodeBuildAction({
        project: deployProject,
        input: buildOutput,
        actionName: `${acc.stage}DeployWebsite`,
        runOrder: 3
      }));
      deployStage.addAction(new codepipeline_actions.CodeBuildAction({
        project: deployProject,
        input: buildOutput,
        actionName: `${acc.stage}DeployApi`,
        runOrder: 4
      }));
    });
  }
}
