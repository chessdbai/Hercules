import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as cognito from '@aws-cdk/aws-cognito';

export interface AuthProps {
  replyToEmail: string,
  replyToEmailArn: string
}

export class Auth extends cdk.Construct {

  readonly client : cognito.UserPoolClient;

  readonly freeUsersPolicy: iam.ManagedPolicy;
  readonly premiumUsersPolicy: iam.ManagedPolicy;
  readonly staffUsersPolicy: iam.ManagedPolicy;

  readonly identityPool: cognito.CfnIdentityPool;
  readonly userPool: cognito.UserPool;
  readonly anonymousUsersRole: iam.Role;
  readonly freeUsersRole: iam.Role;
  readonly premiumUsersRole: iam.Role;
  readonly staffUsersRole: iam.Role;

  constructor(scope: cdk.Construct, id: string, props: AuthProps) {
    super(scope, id);

    this.freeUsersPolicy = new iam.ManagedPolicy(this, 'FreePolicy', {
    });
    this.premiumUsersPolicy = new iam.ManagedPolicy(this, 'PremiumPolicy', {
    });
    this.staffUsersPolicy = new iam.ManagedPolicy(this, 'StaffPolicy', {
    });
    const policyStatement = new iam.PolicyStatement();
    policyStatement.addActions('execute-api:*');
    policyStatement.addAllResources();
    this.freeUsersPolicy.addStatements(policyStatement);
    this.premiumUsersPolicy.addStatements(policyStatement);
    this.staffUsersPolicy.addStatements(policyStatement);

    const externalId = '22f454fe-f14b-4781-9ea3-20fdb38a2d13';

    const snsPublishPolicyDoc = new iam.PolicyDocument();
    const snsPublishStatement = new iam.PolicyStatement();
    snsPublishStatement.addAllResources();
    snsPublishStatement.addActions('sns:Publish');
    snsPublishPolicyDoc.addStatements(snsPublishStatement);
    const cognitoSnsRole = new iam.Role(this, 'CognitoSns', {
      assumedBy: new iam.ServicePrincipal('cognito-idp.amazonaws.com', {
        conditions: {
          StringEquals: {
            'sts:ExternalId': externalId
          }
        }
      }),
      inlinePolicies: {
        'SnsPublishPolicy': snsPublishPolicyDoc
      },
      path: '/service-role/'
    });

    this.userPool = new cognito.UserPool(this, 'UserPool', {
      signInAliases: {
        username: true
      },
      autoVerify: {
        email: true
      }
    });
    const cfnUserPool = this.userPool.node.defaultChild as cognito.CfnUserPool;
    cfnUserPool.mfaConfiguration = 'OPTIONAL';
    cfnUserPool.smsConfiguration = {
      snsCallerArn: cognitoSnsRole.roleArn,
      externalId: externalId
    };
    cfnUserPool.policies = {
        passwordPolicy: {
            minimumLength: 8,
            requireLowercase: false,
            requireNumbers: false,
            requireUppercase: false,
            requireSymbols: false
        }
    };
    cfnUserPool.emailConfiguration = {
      emailSendingAccount: 'DEVELOPER',
      replyToEmailAddress: props.replyToEmail,
      sourceArn: props.replyToEmailArn
    };
    cfnUserPool.addPropertyOverride('EnabledMfas', ['SMS_MFA']);
    this.client = new cognito.UserPoolClient(this, 'WebsiteClient', {
        generateSecret: false,
        userPool: this.userPool,
        userPoolClientName: 'WebsiteClient',
        authFlows: {
          userPassword: true,
          adminUserPassword: true,
          refreshToken: true,
          userSrp: true
        }
    });
    const identityPool = new cognito.CfnIdentityPool(this, 'WebsiteIdentityPool', {
        allowUnauthenticatedIdentities: false,
        cognitoIdentityProviders: [{
            clientId: this.client.userPoolClientId,
            providerName: this.userPool.userPoolProviderName,
        }],
        developerProviderName: 'ChessDB'
    });

    const cognitoUnauthenticatedPrincipal = new iam.FederatedPrincipal(
      'cognito-identity.amazonaws.com',
      {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": identityPool.ref
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "unauthenticated"
        },
      },
    "sts:AssumeRoleWithWebIdentity");

    const cognitoAuthenticatedPrincipal = new iam.FederatedPrincipal(
      'cognito-identity.amazonaws.com',
      {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": identityPool.ref
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        },
      },
    "sts:AssumeRoleWithWebIdentity");

    const anonymousUsersRole = new iam.Role(this, 'AnonRole', {
      assumedBy: cognitoUnauthenticatedPrincipal,
      managedPolicies: [
        this.freeUsersPolicy
      ]
    });
    const freeUsersRole = new iam.Role(this, 'FreeUsersAuthenticatedRole', {
        assumedBy: cognitoAuthenticatedPrincipal,
        managedPolicies: [
          this.freeUsersPolicy
        ]
    });
    const premiumUsersRole = new iam.Role(this, 'PremiumUsersAuthenticatedRole', {
        assumedBy: cognitoAuthenticatedPrincipal,
        managedPolicies: [
          this.freeUsersPolicy,
          this.premiumUsersPolicy
        ]
    });
    const staffUsersRole = new iam.Role(this, 'StaffUsersAuthenticatedRole', {
        assumedBy: cognitoAuthenticatedPrincipal,
        managedPolicies: [
          this.freeUsersPolicy,
          this.premiumUsersPolicy,
          this.staffUsersPolicy  
        ]
    });
    const cognitoPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
          "cognito-sync:*",
          "cognito-identity:*"
      ],
      resources: ["*"],
    });
    freeUsersRole.addToPolicy(cognitoPolicy);
    premiumUsersRole.addToPolicy(cognitoPolicy);
    staffUsersRole.addToPolicy(cognitoPolicy);

    new cognito.CfnIdentityPoolRoleAttachment(this, 'DefaultValid', {
      identityPoolId: identityPool.ref,
      roles: {
        'authenticated': freeUsersRole.roleArn,
        'unauthenticated': anonymousUsersRole.roleArn
      }
    });

    new cognito.CfnUserPoolGroup(this, 'FreeUsersGroup', {
      groupName: 'FreeUsers',
      roleArn: freeUsersRole.roleArn,
      userPoolId: this.userPool.userPoolId
    });
    new cognito.CfnUserPoolGroup(this, 'PremiumUsersGroup', {
      groupName: 'PremiumUsers',
      roleArn: premiumUsersRole.roleArn,
      userPoolId: this.userPool.userPoolId
    });
    new cognito.CfnUserPoolGroup(this, 'StaffUsersGroup', {
      groupName: 'StaffUsers',
      roleArn: staffUsersRole.roleArn,
      userPoolId: this.userPool.userPoolId
    });

    this.anonymousUsersRole = anonymousUsersRole;
    this.freeUsersRole = freeUsersRole;
    this.premiumUsersRole = premiumUsersRole;
    this.staffUsersRole = staffUsersRole;
    this.identityPool = identityPool;
  }
}