const ProdConfig : any = {
  Auth: {
      identityPoolId: 'us-east-2:8dd86360-99b0-494d-9650-2dd0942b0707',
      region: 'us-east-2',
      identityPoolRegion: 'us-east-2',
      userPoolId: 'us-east-2_vMsexvpdR',
      userPoolWebClientId: '388j50pdnjip7r68t5341plh14',
      mandatorySignIn: false,
      cookieStorage: {
          domain: '.chessdb.ai',
          path: '/',
          expires: 365,
          sameSite: "strict",
          secure: true
      },
  }
};
export default ProdConfig; 