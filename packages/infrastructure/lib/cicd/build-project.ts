import * as cdk from '@aws-cdk/core';
import * as kms from '@aws-cdk/aws-kms';
import * as s3 from '@aws-cdk/aws-s3';
import * as codebuild from '@aws-cdk/aws-codebuild';
import { HerculesAccount } from '../accounts';

interface ReportGroups {
  website: codebuild.IReportGroup,
  typeScriptClient: codebuild.IReportGroup,
  api: codebuild.IReportGroup,
  triggers: codebuild.IReportGroup,
  model: codebuild.IReportGroup,
  dotnetClient: codebuild.IReportGroup
}

interface BuildProjectProps {
}

export class BuildProject extends cdk.Construct {

  readonly project : codebuild.PipelineProject;
  readonly reportGroups : ReportGroups;

  constructor(scope: cdk.Construct, id: string, props: BuildProjectProps) {
    super(scope, id);
    
    const reportEncryptionKey = new kms.Key(this, 'Key', {
      alias: 'build-reports-key',
      enableKeyRotation: true,
    });
    const buildReportsBucket = new s3.Bucket(this, 'ReportDataBucket', {
      encryptionKey: reportEncryptionKey
    });

    const websiteReportGroup = new codebuild.ReportGroup(this, 'WebsiteReportGroup', {
      reportGroupName: 'hercules-website',
      exportBucket: buildReportsBucket,
      zipExport: true
    });
    const typescriptClientReportGroup = new codebuild.ReportGroup(this, 'TypeScriptClientReportGroup', {
      reportGroupName: 'hercules-typescript-client',
      exportBucket: buildReportsBucket,
      zipExport: true
    });
    const apiReportGroup = new codebuild.ReportGroup(this, 'ApiReportGroup', {
      reportGroupName: 'Hercules.Api',
      exportBucket: buildReportsBucket,
      zipExport: true
    });
    const triggersReportGroup = new codebuild.ReportGroup(this, 'TriggersReportGroup', {
      reportGroupName: 'Hercules.Triggers',
      exportBucket: buildReportsBucket,
      zipExport: true
    });
    const modelReportGroup = new codebuild.ReportGroup(this, 'ModelReportGroup', {
      reportGroupName: 'Hercules.Api.Model',
      exportBucket: buildReportsBucket,
      zipExport: true
    });
    const clientReportGroup = new codebuild.ReportGroup(this, 'ClientReportGroup', {
      reportGroupName: 'Hercules.Api.Client',
      exportBucket: buildReportsBucket,
      zipExport: true
    });

    this.reportGroups = {
      api: apiReportGroup,
      triggers: triggersReportGroup,
      website: websiteReportGroup,
      typeScriptClient: typescriptClientReportGroup,
      dotnetClient: clientReportGroup,
      model: modelReportGroup
    }


    const buildProject = new codebuild.PipelineProject(this, 'Project', {
      environment: {
        computeType: codebuild.ComputeType.LARGE,
        buildImage: codebuild.LinuxBuildImage.STANDARD_4_0,
        privileged: true
      }
    });
    Object.values(this.reportGroups).forEach(v => {
      const rg = v as codebuild.IReportGroup;
      rg.grantWrite(buildProject.role!);
    }); 

    this.project = buildProject;
  }
}
