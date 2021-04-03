import { Construct } from 'constructs';
import { Idp } from './idp';
import { UserPoolIdentityProviderBase } from '@aws-cdk/aws-cognito/lib/user-pool-idps/private/user-pool-idp-base';
import * as cognito from '@aws-cdk/aws-cognito';
import * as sm from '@aws-cdk/aws-secretsmanager';

/**
 * Properties to initialize TwitchIdp.
 */
export interface LichessIdpProps extends cognito.UserPoolIdentityProviderProps {
  readonly secret : sm.ISecret;
  readonly scopes?: string[];
}

export class LichessIdp extends UserPoolIdentityProviderBase implements Idp {
  /**
   * The primary identifier of this identity provider.
   */
  readonly providerName: string;
  readonly usernameAttribute: string;
  /**
   *
   */
  constructor(scope: Construct, id: string, props: LichessIdpProps) {
    super(scope, id, props);

    const clientId = props.secret.secretValueFromJson('clientId').toString();
    const clientSecret = props.secret.secretValueFromJson('clientSecret').toString();

    const resource = new cognito.CfnUserPoolIdentityProvider(this, 'Resource', {
      userPoolId: props.userPool.userPoolId,
      providerName: 'Lichess',
      providerType: 'OIDC',
      providerDetails: {
          client_id: clientId,
          client_secret: clientSecret,
          authorize_scopes: props.scopes!.join(' '),
          attributes_request_method: 'GET',
          oidc_issuer: 'https://oauth.lichess.org/oauth/authorize',
          authorize_url: 'https://oauth.lichess.org/oauth/authorize',
          token_url: 'https://oauth.lichess.org/oauth',
          attributes_url: 'https://lichess.org/api/account',
          jwks_uri: 'https://oauth.lichess.org/oauth/keys'
      },
      attributeMapping: {
        'custom:lichess_username': 'preferred_username'
      }
  });
  this.providerName = super.getResourceNameAttribute(resource.ref);
  this.usernameAttribute = 'custom:lichess_username';
  }
}
