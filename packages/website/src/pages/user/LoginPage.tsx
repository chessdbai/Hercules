import React, { useState, ChangeEvent } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import {
  Form, Input,
  Button, Checkbox,
  Spin, Layout, PageHeader
} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useHistory, Link } from "react-router-dom";

type MfaType = 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' | null;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface FormValues {
  username: string,
  password: string,
  rememberMe: boolean
}

export default function LoginPage() {

  let [loading, setLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();



  const onFinish = async (values : FormValues) => {
    
    const username = values.username;
    const password = values.password;
    setLoading(true);
    try {
      var user = await Auth.signIn(username, password)!;

      console.log(user);
      if (user.challengeName === 'SMS_MFA' ||
            user.challengeName === 'SOFTWARE_TOKEN_MFA') {
            
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          const {requiredAttributes} = user.challengeParam;
          
        }
      history.push('/');
    } catch (err) {
      const errType = err.name;
      console.log(err);
      console.log(`Error type: ${errType}`);
      if (errType == 'PasswordResetRequiredException') {
        history.push('/security/update-password');
      } else if (errType == "UserNotFoundException") {
        setErrorMessage('No user with that name was found.');
      } else if (errType == "UserNotConfirmedException") {
        history.push('/user/confirm', {
          username: username
        });
      } else if (errType == "NotAuthorizedException") {
        setErrorMessage('Incorrect username of password.');
      } else if (errType == "NotAuthorizedException") {
        setErrorMessage('An unknown authentication error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const errorComponent = errorMessage !== null && errorMessage !== undefined && errorMessage !== '' ?
    (
      <Form.Item {...tailLayout}>
        <span style={{color: 'red'}}>{errorMessage}</span>
      </Form.Item>) :
    <></>;

  return (
    <Layout style={{height: '100%', width: '100%'}}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Login"
        subTitle="Access your custom chess database"
      />
      <Layout>
        <Form
        {...formItemLayout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {errorComponent}
          <Form.Item {...tailLayout}>
            <Button
                htmlType="submit"
                className="login-form-button"
                type="primary">
              Submit
            </Button>
            {loading ? <Spin /> : <></>}
            <div {...formItemLayout}>
              <Link to='/user/reset'>Recover your Password?</Link> or <Link to='/user/register'>Register now!</Link>
            </div>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
                className="login-form-button"
                type='ghost'
                onClick={(e) => Auth.federatedSignIn({ customProvider: 'Twitch'})}>
              Login With Twitch
            </Button>
            <Button
                className="login-form-button"
                type='ghost'
                onClick={(e) => Auth.federatedSignIn({ customProvider: 'Discord'})}>
              Login With Discord
            </Button>
            <Button
                className="login-form-button"
                type='ghost'
                onClick={(e) => Auth.federatedSignIn({ customProvider: 'Lichess'})}>
              Login With Lichess
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </Layout>
  );
}