import { Construct } from 'constructs';
import { Idp } from './idp';
import { UserPoolIdentityProviderBase } from '@aws-cdk/aws-cognito/lib/user-pool-idps/private/user-pool-idp-base';
import * as cognito from '@aws-cdk/aws-cognito';
import * as sm from '@aws-cdk/aws-secretsmanager';

/**
 * Properties to initialize TwitchIdp.
 */
export interface TwitchIdpProps extends cognito.UserPoolIdentityProviderProps {
  readonly secret : sm.ISecret;
  readonly scopes?: string[];
}

export class TwitchIdp extends UserPoolIdentityProviderBase implements Idp {
  /**
   * The primary identifier of this identity provider.
   */
  readonly providerName: string;
  readonly usernameAttribute: string;
  /**
   *
   */
  constructor(scope: Construct, id: string, props: TwitchIdpProps) {
    super(scope, id, props);

    const clientId = props.secret.secretValueFromJson('clientId').toString();
    const clientSecret = props.secret.secretValueFromJson('clientSecret').toString();

    const resource = new cognito.CfnUserPoolIdentityProvider(this, 'Resource', {
      userPoolId: props.userPool.userPoolId,
      providerName: 'Twitch',
      providerType: 'OIDC',
      providerDetails: {
          client_id: clientId,
          client_secret: clientSecret,
          authorize_scopes: props.scopes!.join(' '),
          attributes_request_method: 'GET',
          oidc_issuer: 'https://id.twitch.tv/oauth2',
          authorize_url: 'https://id.twitch.tv/oauth2/authorize',
          token_url: 'https://id.twitch.tv/oauth2/token',
          attributes_url: 'https://id.twitch.tv/oauth2/userinfo',
          jwks_uri: 'https://id.twitch.tv/oauth2/keys'
      },
      attributeMapping: {
        'custom:twitch_username': 'preferred_username'
      }
  });
  this.providerName = super.getResourceNameAttribute(resource.ref);
  this.usernameAttribute = 'custom:twitch_username';
  }
}