import React, { useState, ChangeEvent } from 'react';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import {
  Form, Input,
  Button, Checkbox,
  Spin, Space
} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useHistory, Link } from "react-router-dom";

type MfaType = 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' | null;

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
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

  let [mfaCode, setMfaCode] = useState('');
  let [password, setPassword] = useState('');
  let [mfaType, setMfaType] = useState(null as MfaType);
  let [username, setUsername] = useState('');
  let [errorMessage, setErrorMessage] = useState('');
  let [loading, setLoading] = useState(false);

  let history = useHistory();



  const onFinish = async (values : FormValues) => {
    console.log('Form values:');
    console.log(values);
    const username = values.username;
    const password = values.password;
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
      console.log(err);
      if (err.name == 'PasswordResetRequiredException') {
        history.push('/security/update-password');
      } else if (err.Name == "UserNotFoundException") {
        setErrorMessage('No user with that name was found.');
      } else if (err.Name == "UserNotConfirmedException") {
        setErrorMessage('The user exists but requires MFA confirmation before becoming active.');
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleMfaSubmit = async (e: any) => {
    await Auth.confirmSignIn(
      username,
      mfaCode,
      mfaType
    );
    history.push('/home');
  };

  const renderMfaForm = () => {
    var loader = !loading ? <></> : <Spin tip="Loading..." />
    return (
      <Form className="mfa-form">
        <Form.Item>
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="MFA Code"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMfaCode(e.target.value)}
            />
        </Form.Item>
        {errorMessage !== undefined && errorMessage !== null && errorMessage !== '' ?
          <span style={{color: 'red'}}></span>
        : <></>}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={username === undefined || password === undefined}
            onClick={(e) => handleMfaSubmit(e)}>
            Confirm MFA Code
          </Button>
          {loader}
        </Form.Item>
      </Form>
    )
  }  

  return (
    <Form
      {...layout}
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
        <Input onChange={(e) => {
          setUsername(e.target.value);
        }} />
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

      <Form.Item {...tailLayout}>
        <Button
            htmlType="submit"
            className="login-form-button"
            type="primary">
          Submit
        </Button>
        {loading ? <Spin /> : <></>}
        <div {...formItemLayout}>
          <Link to='/user/recover-password'>Recover your Password?</Link> or <Link to='/user/register'>Register now!</Link>
        </div>
      </Form.Item>
    </Form>
  );
}