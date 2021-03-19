import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import {
  Form, Input, Layout,
  PageHeader, Button, Spin,
} from 'antd';
import {
} from 'antd';
import { useHistory } from "react-router-dom";

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

export default function ResetPasswordPage() {

  let [username, setUsername] = useState('');
  let [deliveryDestination, setDeliveryDestination] = useState('');
  let [loading, setLoading] = useState(false);

  let history = useHistory();
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleUsernameSubmit = async (values: any) => {
    const uname = values.username;
    const forgotResponse = await Auth.forgotPassword(uname);
    setDeliveryDestination(forgotResponse.CodeDeliveryDetails.Destination);
    setUsername(uname);
  }

  const handlePasswordSubmit = async (values: any) => {
    const resetCode = values.resetCode;
    const newPassword = values.newPassword;
    const forgotResponse = await Auth.forgotPasswordSubmit(username, resetCode, newPassword);
    console.log(forgotResponse);
    history.push('/user/login');
  }

  const step1Form = () => {
    var loader = !loading ? <></> : <Spin tip="Loading..." />
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleUsernameSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
              htmlType="submit"
              className="login-form-button"
              type="primary">
            Submit
          </Button>
          {loading ? <Spin /> : <></>}
        </Form.Item>
      </Form>
    )
  }  

  const step2Form = () => {
    var loader = !loading ? <></> : <Spin tip="Loading..." />
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handlePasswordSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Reset code"
          name="resetCode"
          rules={[{ required: true, message: `Please input the code sent to '${deliveryDestination}'!` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please create a password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
              htmlType="submit"
              className="login-form-button"
              type="primary">
            Submit
          </Button>
          {loading ? <Spin /> : <></>}
        </Form.Item>
      </Form>
    )
  }    

  var formToShow;
  if (username !== null && username !== undefined && username !== '') {
    formToShow = step2Form();
  } else {
    formToShow = step1Form();
  }

  return (
  
    <Layout style={{height: '100%', width: '100%'}}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Reset Password"
        subTitle=""
      />
      <Layout>
        {formToShow}
      </Layout>
    </Layout>
  )
}