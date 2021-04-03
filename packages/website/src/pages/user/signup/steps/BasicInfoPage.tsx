import React, { ChangeEvent, useState } from 'react';
import { Auth } from 'aws-amplify';
import {
  Form,
  Button,
  Checkbox,
  Input
} from 'antd';
import 'react-intl-tel-input/dist/main.css';

export interface NewUserInfo {
  termsAndConditionsAgreed: boolean,
  emailAddress?: string,
  passsword?: string,
  phoneNumber?: string,
  firstName?: string,
  lastName?: string
}

interface IUserSignupProps {
  onSubmit: (user: NewUserInfo) => void;
}

interface IUserSignupState {
  autoCompleteResult: any[],
  confirmDirty: boolean,
  loading: boolean,
  confirmPassword?: string,
  validationError?: string,
  registerError?: any,
  hasSubmittedOnce: boolean,
  registrationInfo: NewUserInfo,
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
 
interface RegistrationFormProps {
  onSubmit: (user: any) => void
}
 
const RegistrationForm  : React.FC<RegistrationFormProps> = (p: RegistrationFormProps) => {
  const initialRegInfo : NewUserInfo = {
    termsAndConditionsAgreed: true
  }
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const username = values.username;
    const password = values.password;
    const email = values.email;
    const firstName = values.firstName;
    const lastName = values.lastName;
    setLoading(true);
    try {
      const result = await Auth.signUp({
        username: username, 
        password: password, 
        attributes: {
          given_name: firstName,
          family_name: lastName,
          email: email,
          name: `${firstName} ${lastName}`,
          locale: `en-US`
        }
      })!;
      p.onSubmit(result.user);
    }
    catch (err) {
      
    }
    setLoading(false);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  return (
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item  
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                var validUsername = /^[a-zA-Z0-9\-_]{4,64}$/.test(value);
                if (validUsername) {
                  return Promise.resolve();
                }
                return Promise.reject('Your username must be only letters and numbers, and must be between 4 and 64 characters long.');
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item  
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please enter your first name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item  
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Please enter your last name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
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
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">ChessDB user agreement.</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
  );
};

export default RegistrationForm;