/// <reference types="../../typings/auth-constants" />

import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
      identityPoolId: REACT_APP_AUTH_IDENTITY_POOL_ID,
      region: REACT_APP_AUTH_REGION,
      identityPoolRegion: REACT_APP_AUTH_REGION,
      userPoolId: REACT_APP_AUTH_USER_POOL_ID,
      userPoolWebClientId: REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
      mandatorySignIn: false,
      cookieStorage: {
          domain: REACT_APP_AUTH_COOKIE_STORAGE_DOMAIN,
          path: '/',
          expires: 30,
          sameSite: "strict",
          secure: true
      },
      authenticationFlowType: 'USER_PASSWORD_AUTH',
  }
});