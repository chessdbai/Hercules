import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Form, Input, Button, Checkbox, Spin, Space } from 'antd';
import { useHistory, Link } from "react-router-dom";

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

  let [loading, setLoading] = useState(false);

  let history = useHistory();

  const onFinish = async (values : FormValues) => {
    console.log('Form values:');
    console.log(values);
    const username = values.username;
    const password = values.password;
    try {
      var response = await Auth.signIn(username, password)!;
      history.push('/');
    } catch (err) {
      const error = err as Error;
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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