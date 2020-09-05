import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
      identityPoolId: 'us-east-2:2074d0f2-a377-4fbd-8375-087a2f7768ae',
      region: 'us-east-2',
      identityPoolRegion: 'us-east-2',
      userPoolId: 'us-east-2_xlADtr6e2',
      userPoolWebClientId: '48jp093jktthd3jfi2pit4r738',
      mandatorySignIn: false,
      cookieStorage: {
          domain: '.chessdb.ai',
          path: '/',
          expires: 30,
          sameSite: "strict",
          secure: true
      },
      authenticationFlowType: 'USER_PASSWORD_AUTH',
  }
});