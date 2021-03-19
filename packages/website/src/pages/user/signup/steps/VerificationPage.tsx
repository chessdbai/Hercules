import React, { ChangeEvent, useState } from 'react';
import { Auth } from 'aws-amplify';
import {
  Form,
  Select,
  Button,
  Checkbox,
  Input
} from 'antd';
import 'react-intl-tel-input/dist/main.css';
import { sanitizeNumberForCognito } from '../../PhoneNumberUtils';
import IntlTelInput, { SelectedCountryInputValue } from 'react-intl-tel-input';
import { CognitoUser } from 'amazon-cognito-identity-js';

interface IVerificationProps {
  onSubmit: (verificationCode: string) => void,
  username: string
}

interface IUserSignupState {
  verificationCode: string
}

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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const VerificationForm  : React.FC<IVerificationProps> = (p: IVerificationProps) => {
  const onFinish = async (values: any) => {
    await Auth.confirmSignUp(p.username, values.verificationCode, { });
  };

  return (
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '86',
        }}
        scrollToFirstError
      >
        Check your email address for a verification code.
        <Form.Item  
          name="verificationCode"
          label="Verification Code"
          rules={[
            {
              required: true,
              message: 'Please enter the verification code sent to your email address!',
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Verify
          </Button>
        </Form.Item>
      </Form>
  );
};

export default VerificationForm;