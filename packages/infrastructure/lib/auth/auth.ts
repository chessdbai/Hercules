import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as certs from '@aws-cdk/aws-certificatemanager';
import * as r53 from '@aws-cdk/aws-route53';
import * as r53targets from '@aws-cdk/aws-route53-targets';
import * as cognito from '@aws-cdk/aws-cognito';
import * as idps from './idps';
import * as sm from "@aws-cdk/aws-secretsmanager";
import { Triggers } from './triggers';
import { HerculesAccount } from '../accounts';
import { ShimHostedZone } from '../shim-hosted-zone';

export interface AuthProps {
  account: HerculesAccount
}

export class Auth extends cdk.Construct {

  readonly client : cognito.UserPoolClient;
  readonly triggers : Triggers;

  readonly freeUsersPolicy: iam.ManagedPolicy;
  readonly premiumUsersPolicy: iam.ManagedPolicy;
  readonly betaUsersPolicy: iam.ManagedPolicy;
  readonly staffUsersPolicy: iam.ManagedPolicy;

  readonly identityPool: cognito.CfnIdentityPool;
  readonly userPool: cognito.UserPool;
  readonly anonymousUsersRole: iam.Role;
  readonly betaUsersRole: iam.Role;
  readonly freeUsersRole: iam.Role;
  readonly premiumUsersRole: iam.Role;
  readonly staffUsersRole: iam.Role;

  readonly staffGroup : cognito.CfnUserPoolGroup;
  readonly freeGroup : cognito.CfnUserPoolGroup;
  readonly premiumGroup : cognito.CfnUserPoolGroup;
  readonly betaTestersGroup : cognito.CfnUserPoolGroup;

  constructor(scope: cdk.Construct, id: string, props: AuthProps) {
    super(scope, id);

    this.freeUsersPolicy = new iam.ManagedPolicy(this, 'FreePolicy', {
    });
    this.premiumUsersPolicy = new iam.ManagedPolicy(this, 'PremiumPolicy', {
    });
    this.staffUsersPolicy = new iam.ManagedPolicy(this, 'StaffPolicy', {
    });
    this.betaUsersPolicy = new iam.ManagedPolicy(this, 'BetaPolicy', {
    });
    const policyStatement = new iam.PolicyStatement();
    policyStatement.addActions('execute-api:*');
    policyStatement.addAllResources();
    this.freeUsersPolicy.addStatements(policyStatement);
    this.premiumUsersPolicy.addStatements(policyStatement);
    this.staffUsersPolicy.addStatements(policyStatement);
    this.betaUsersPolicy.addStatements(policyStatement);

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
      enableSmsRole: true,
      smsRoleExternalId: externalId,
      mfa: cognito.Mfa.OPTIONAL,
      mfaSecondFactor: {
        sms: true,
        otp: true
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
      autoVerify: {
        email: true,
        phone: true
      },
      standardAttributes: {
        familyName: {
          mutable: true
        },
        fullname: {
          mutable: true
        },
        middleName: {
          mutable: true,
        },
        phoneNumber: {
          mutable: true,
        },
        givenName: {
          mutable: true
        },
        email: {
          mutable: true
        },
        locale: {
          mutable: true
        },
        address: {
          mutable: true
        },
        timezone: {
          mutable: true
        }
      },
      customAttributes: {
        'twitch_username': new cognito.StringAttribute({
          mutable: true
        }),
        'chesscom_username': new cognito.StringAttribute({
          mutable: true
        }),
        'discord_username': new cognito.StringAttribute({
          mutable: true
        }),
        'lichess_username': new cognito.StringAttribute({
          mutable: true
        }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: true,
        requireSymbols: false
      },
      selfSignUpEnabled: true,
      
    });

    const twitchIdp = new idps.TwitchIdp(this, 'Twitch', {
      secret: sm.Secret.fromSecretCompleteArn(this, "TwitchAuthSecret", props.account.authConfig.twitch),
      scopes: ['openid', 'user:read:email'],
      userPool: this.userPool,
    });
    this.userPool.registerIdentityProvider(twitchIdp);


    const discordIdp = new idps.DiscordIdp(this, 'Discord', {
      secret: sm.Secret.fromSecretCompleteArn(this, "DiscordAuthSecret", props.account.authConfig.discord),
      scopes: ['openid', 'email', 'identify'],
      userPool: this.userPool,
    });
    this.userPool.registerIdentityProvider(discordIdp);


    const lichessIdp = new idps.LichessIdp(this, 'Lichess', {
      secret: sm.Secret.fromSecretCompleteArn(this, "LichessAuthSecret", props.account.authConfig.lichess),
      scopes: ['openid', 'email:read'],
      userPool: this.userPool,
    });
    this.userPool.registerIdentityProvider(lichessIdp);


    const publicZone = new ShimHostedZone(this, 'PublicZone', {
      hostedZoneId: props.account.publicZoneId,
      zoneName: props.account.domainName
    });
    const authDomainName = `oauth.${props.account.domainName}`;
    //const authCert = certs.Certificate.fromCertificateArn(this, 'AuthCert', cdk.Fn.importValue('AuthCertArn'));
    const authCert = new certs.DnsValidatedCertificate(this, 'AuthCert', {
      domainName: authDomainName,
      hostedZone: publicZone,
      region: 'us-east-1'
    });
    const userPoolDomain = this.userPool.addDomain('AuthDomain', {
      customDomain: {
        domainName: authDomainName,
        certificate: authCert
      }
    });

    new r53.ARecord(this, 'AuthDnsRecord', {
      target: r53.RecordTarget.fromAlias(new r53targets.UserPoolDomainTarget(userPoolDomain)),
      zone: publicZone,
      recordName: 'oauth'
    });

    const cfnUserPool = this.userPool.node.defaultChild as cognito.CfnUserPool;
    cfnUserPool.emailConfiguration = {
      emailSendingAccount: 'DEVELOPER',
      replyToEmailAddress: props.account.replyToEmail,
      sourceArn: props.account.replyToEmailArn,
    };
    (cfnUserPool.schema as cognito.CfnUserPool.SchemaAttributeProperty[]).push({
      developerOnlyAttribute: true,
      attributeDataType: 'String',
      mutable: true,
      name: 'databaseId',
      stringAttributeConstraints: {
        minLength: '36',
        maxLength: '36'
      }
    })
    cfnUserPool.addPropertyOverride('EnabledMfas', ['SMS_MFA']);
    this.client = new cognito.UserPoolClient(this, 'WebsiteClient', {
        generateSecret: false,
        userPool: this.userPool,
        userPoolClientName: 'WebsiteClient',
        authFlows: {
          userPassword: true,
          adminUserPassword: true,
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
        ]
    });
    const betaUsersRole = new iam.Role(this, 'BetaUsersAuthenticatedRole', {
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
    betaUsersRole.addToPolicy(cognitoPolicy);

    const mapping = new cdk.CfnJson(this, 'Mapping', {
      value: {
        [`cognito-idp.${cdk.Aws.REGION}.amazonaws.com/${this.userPool.userPoolId}:${this.client.userPoolClientId}`]: {
          ambiguousRoleResolution: 'Deny',
          type: 'Token'
        }
      }
    });
    
    new cognito.CfnIdentityPoolRoleAttachment(this, 'DefaultValid', {
      identityPoolId: identityPool.ref,
      roles: {
        'authenticated': freeUsersRole.roleArn,
        'unauthenticated': anonymousUsersRole.roleArn
      }
    });

    this.freeGroup = new cognito.CfnUserPoolGroup(this, 'FreeUsersGroup', {
      groupName: 'FreeUsers',
      roleArn: freeUsersRole.roleArn,
      userPoolId: this.userPool.userPoolId
    });
    this.premiumGroup = new cognito.CfnUserPoolGroup(this, 'PremiumUsersGroup', {
      groupName: 'PremiumUsers',
      roleArn: premiumUsersRole.roleArn,
      userPoolId: this.userPool.userPoolId
    });
    this.betaTestersGroup = new cognito.CfnUserPoolGroup(this, 'BetaTestersGroup', {
      groupName: 'BetaTesters',
      roleArn: betaUsersRole.roleArn,
      userPoolId: this.userPool.userPoolId
    });
    this.staffGroup = new cognito.CfnUserPoolGroup(this, 'StaffUsersGroup', {
      groupName: 'StaffUsers',
      roleArn: staffUsersRole.roleArn,
      userPoolId: this.userPool.userPoolId
    });

    this.triggers = new Triggers(this, 'Triggers', {});
    this.userPool.addTrigger(cognito.UserPoolOperation.POST_CONFIRMATION, this.triggers.lambdaFunction);

    this.anonymousUsersRole = anonymousUsersRole;
    this.freeUsersRole = freeUsersRole;
    this.premiumUsersRole = premiumUsersRole;
    this.staffUsersRole = staffUsersRole;
    this.identityPool = identityPool;
  }
}