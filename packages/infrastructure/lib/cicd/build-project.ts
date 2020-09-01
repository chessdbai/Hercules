import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as kms from '@aws-cdk/aws-kms';
import * as s3 from '@aws-cdk/aws-s3';
import * as codebuild from '@aws-cdk/aws-codebuild';
import { HerculesAccount } from '../accounts';

interface PackageReportGroups {
  tests: codebuild.IReportGroup,
  coverage: codebuild.IReportGroup,
}

interface ReportGroups {
  website: PackageReportGroups,
  typeScriptAwsClientCore: PackageReportGroups,
  typeScriptClient: PackageReportGroups,
  api: PackageReportGroups,
  triggers: PackageReportGroups,
  model: PackageReportGroups,
  dotnetClient: PackageReportGroups
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

    const createDotNetDualReportGroups = (scope: cdk.Construct, bucket: s3.IBucket, name: string) : PackageReportGroups => {

      const testsReportGroup = new codebuild.ReportGroup(scope, `${name}TestsReportGroup`, {
        reportGroupName: `${name}-tests`,
        exportBucket: bucket,
        zipExport: true
      });
      (testsReportGroup.node.defaultChild as codebuild.CfnReportGroup).addPropertyOverride("Name", `${name}-tests`);
      (testsReportGroup.node.defaultChild as codebuild.CfnReportGroup).addPropertyOverride("Type", 'TEST');
    
      const coverageReportGroup = new codebuild.ReportGroup(scope, `${name}CoverageReportGroup`, {
        reportGroupName: `${name}-coverage`,
        exportBucket: bucket,
        zipExport: true
      });
      (coverageReportGroup.node.defaultChild as codebuild.CfnReportGroup).addPropertyOverride("Name", `${name}-coverage`);
      (coverageReportGroup.node.defaultChild as codebuild.CfnReportGroup).addPropertyOverride("Type", 'CODE_COVERAGE');
    
      return {
        tests: testsReportGroup,
        coverage: coverageReportGroup
      }
    };
    
    const buildRole = new iam.Role(this, 'BuildRole', {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('codebuild.amazonaws.com'),
        new iam.ServicePrincipal('codepipeline.amazonaws.com')
      )
    });

    const buildProject = new codebuild.PipelineProject(this, 'Project', {
      environment: {
        computeType: codebuild.ComputeType.LARGE,
        buildImage: codebuild.LinuxBuildImage.STANDARD_4_0,
        privileged: true
      },
      role: buildRole
    });

    const reportingPolicy = new iam.PolicyStatement();
    reportingPolicy.addActions(
      "codebuild:BatchGetBuildBatches",
      "codebuild:ListReportsForReportGroup",
      "codebuild:DescribeTestCases",
      "codebuild:GetResourcePolicy",
      "codebuild:ListReportGroups",
      "codebuild:DescribeCodeCoverages",
      "codebuild:ListBuildsForProject",
      "codebuild:BatchGetBuilds",
      "codebuild:CreateReport",
      "codebuild:UpdateReport",
      "codebuild:ListReports",
      "codebuild:BatchPutCodeCoverages",
      "codebuild:ListProjects",
      "codebuild:BatchGetReportGroups",
      "codebuild:ListConnectedOAuthAccounts",
      "codebuild:BatchGetProjects",
      "codebuild:BatchGetReports",
      "codebuild:ListCuratedEnvironmentImages",
      "codebuild:ListSourceCredentials",
      "codebuild:ListRepositories",
      "codebuild:ListSharedProjects",
      "codebuild:ListBuildBatches",
      "codebuild:ListSharedReportGroups",
      "codebuild:ListBuilds",
      "codebuild:ListBuildBatchesForProject",
      "codebuild:BatchPutTestCases"
    );
    reportingPolicy.addAllResources();

    const bucketPolicy = new iam.PolicyStatement();
    bucketPolicy.addActions("s3:*");
    bucketPolicy.addResources(
      buildReportsBucket.bucketArn,
      `${buildReportsBucket.bucketArn}/*`);

    const kmsPolicy = new iam.PolicyStatement();
    kmsPolicy.addActions(
      "kms:Decrypt",
      "kms:DescribeKey",
      "kms:Encrypt",
      "kms:ReEncrypt*",
      "kms:GenerateDataKey*"
    );
    kmsPolicy.addResources(reportEncryptionKey.keyArn);

    const artifactDomainPolicy = new iam.PolicyStatement();
    artifactDomainPolicy.addActions('codeartifact:GetAuthorizationToken');
    artifactDomainPolicy.addResources('arn:aws:codeartifact:us-east-2:407299974961:domain/chessdb');

    const artifactRepoPolicy = new iam.PolicyStatement();
    artifactRepoPolicy.addActions('codeartifact:GetRepositoryEndpoint');
    artifactRepoPolicy.addActions('codeartifact:GetRepositoryEndpoint');
    artifactRepoPolicy.addResources('arn:aws:codeartifact:us-east-2:407299974961:repository/chessdb/chessdb-and-npm');
    artifactRepoPolicy.addResources('arn:aws:codeartifact:us-east-2:407299974961:domain/chessdb/*');
    
    const artifactPackagePolicy = new iam.PolicyStatement();
    artifactPackagePolicy.addActions('codeartifact:GetRepositoryEndpoint', 'codeartifact:*');
    artifactPackagePolicy.addResources(
      'arn:aws:codeartifact:us-east-2:407299974961:package/chessdb/*/*/*/*',
      'arn:aws:codeartifact:us-east-2:407299974961:package/chessdb/*/*//*');

    const codeBuildPolicy = new iam.PolicyStatement();
    codeBuildPolicy.addActions('logs:*');
    codeBuildPolicy.addActions('cloudwatch:*');
    codeBuildPolicy.addAllResources();

    buildRole.addToPolicy(artifactDomainPolicy);
    buildRole.addToPolicy(artifactRepoPolicy);
    buildRole.addToPolicy(artifactPackagePolicy);
    buildRole.addToPolicy(bucketPolicy);
    buildRole.addToPolicy(kmsPolicy);
    buildRole.addToPolicy(codeBuildPolicy);
    buildRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodeArtifactAdminAccess'));
    
    this.project = buildProject;
  }
}
