import { request } from 'umi';
import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export const queryCurrent = async () : Promise<API.CurrentUser> =>
{
  const cognitoUser = await Auth.currentAuthenticatedUser()! as CognitoUser;
  const userAttributes = await new Promise<CognitoUserAttribute[]>(
    (accept, reject) => {
      cognitoUser.getUserAttributes((err, user) => {
        if (err !== null && err !== undefined) {
          const error = err as Error;
          reject(error);
        } else {
          accept(user);
        }
      });
    });
  let userId : string | undefined;
  userAttributes.forEach(ua => {
    if (ua.getName() === "email") {
      userId = ua.getValue();
    }
  });
  return {
    userid: userId
  };
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
