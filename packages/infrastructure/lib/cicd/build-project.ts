import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as codebuild from '@aws-cdk/aws-codebuild';

interface BuildProjectProps {
}

export class BuildProject extends cdk.Construct {

  readonly project : codebuild.PipelineProject;

  constructor(scope: cdk.Construct, id: string, props: BuildProjectProps) {
    super(scope, id);
    
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

    const artifactStsPolicy = new iam.PolicyStatement();
    artifactStsPolicy.addActions('sts:GetServiceBearerToken');
    artifactStsPolicy.addAllResources();

    const artifactDomainPolicy = new iam.PolicyStatement();
    artifactDomainPolicy.addActions('codeartifact:GetAuthorizationToken');
    artifactDomainPolicy.addResources('arn:aws:codeartifact:us-east-2:407299974961:domain/chessdb');

    const artifactRepoPolicy = new iam.PolicyStatement();
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

    buildRole.addToPolicy(artifactStsPolicy);
    buildRole.addToPolicy(artifactDomainPolicy);
    buildRole.addToPolicy(artifactRepoPolicy);
    buildRole.addToPolicy(artifactPackagePolicy);
    buildRole.addToPolicy(codeBuildPolicy);
    buildRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodeArtifactAdminAccess'));

    this.project = buildProject;
  }
}
