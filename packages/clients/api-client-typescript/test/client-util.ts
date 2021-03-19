import { SharedIniFileCredentials } from 'aws-sdk';
import CognitoIdentityServiceProvider, {
  AdminInitiateAuthRequest
} from 'aws-sdk/clients/cognitoidentityserviceprovider';
import SecretsManager, {
  GetSecretValueRequest
} from 'aws-sdk/clients/secretsmanager';
import { HerculesApiClient } from '../src/HerculesApiClient';

const CLIENT_ID = '6n26r63cg0kpto2lbq7sio92iq';
const USER_POOL = 'us-east-2_YXcy5kpiW';
const USERNAME = 'integ';

interface IntegCreds {
  username: string,
  password: string
}

class AuthHeaderProvider {

  private readonly secretMan : SecretsManager;
  private readonly client : CognitoIdentityServiceProvider;
  private idToken : string | undefined;

  constructor() {
    var creds = new SharedIniFileCredentials({
      profile: 'zugzwang-app'
    });
    this.secretMan = new SecretsManager({
      credentials: creds,
      region: 'us-east-2'
    });
    this.client = new CognitoIdentityServiceProvider({
      credentials: creds,
      region: 'us-east-2'
    });
  }

  getHeader = async () : Promise<string> => {
    var creds = await this.getCreds();
    if (this.idToken === undefined) {
      var req : AdminInitiateAuthRequest = {
        ClientId: CLIENT_ID,
        UserPoolId: USER_POOL,
        AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
        AuthParameters: {
          'USERNAME': creds.username,
          'PASSWORD': creds.password,
        }
      };
      var res = await this.client.adminInitiateAuth(req).promise();
      this.idToken = res!.AuthenticationResult!.IdToken;
    }
    return this.idToken!;
  }

  private getCreds = async () : Promise<IntegCreds> => {
    var req : GetSecretValueRequest = {
      SecretId: 'IntegrationTestUserPassword'
    };
    var res = await this.secretMan.getSecretValue(req).promise()!;
    const credJson = res.SecretString!;
    return JSON.parse(credJson);
  }
}

export const createClient = () : HerculesApiClient => {
  const provider = new AuthHeaderProvider();

  return new HerculesApiClient({
    endpoint: 'api.chessdb.ai',
    authorizer: async () => await provider.getHeader()
  });
};