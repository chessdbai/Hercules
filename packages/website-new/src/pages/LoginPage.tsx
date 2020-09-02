import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import LoginFrom from './components/Login';

const { Tab, Username, Password, Submit } = LoginFrom;

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const replaceGoto = () => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#'));
      }
    } else {
      window.location.href = '/';
      return;
    }
  }
  window.location.href = urlParams.href.split(urlParams.pathname)[0] + (redirect || '/');
};

const Login: React.FC<{}> = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const [submitting, setSubmitting] = useState(false);

  const { refresh } = useModel('@@initialState');
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      await Auth.signIn({
        username: values.username,
        password: values.password
      }) as CognitoUser;
      message.success('Logged in!');
      replaceGoto();
      setTimeout(() => { refresh(); }, 0);
      setUserLoginState({
        status: "ok",
        
      });
    } catch (error) {
      const err = error as Error;
      message.error(`Login failed - ${err}`);
    }
    setSubmitting(false);
  };

  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>ChessDB</span>
            </Link>
          </div>
          <div className={styles.desc}>ChessDB.ai</div>
        </div>

        <div className={styles.main}>
          <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
            <Tab key="account" tab="Login">
              {status === 'error' && loginType === 'account' && !submitting && (
                <LoginMessage content="Incorrect username or password" />
              )}

              <Username
                name="username"
                placeholder="username"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a username!',
                  },
                ]}
              />
              <Password
                name="password"
                placeholder="password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a password!',
                  },
                ]}
              />
            </Tab>
            <div>
              <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
                Keep me logged in
              </Checkbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                Forgot Password
              </a>
            </div>
            <Submit loading={submitting}>Login</Submit>
            <div className={styles.other}>
              <Link className={styles.register} to="/user/register">
                Sign Up
              </Link>
            </div>
          </LoginFrom>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
