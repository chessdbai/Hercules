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
 
const RegistrationForm = () => {
  const initialRegInfo : NewUserInfo = {
    termsAndConditionsAgreed: true
  }
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
  const [registrationInfo, setRegistrationInfo] = useState(initialRegInfo);
  const telRef : React.RefObject<IntlTelInput> = React.createRef();

  const [confirmPassword, setConfirmPassword] = useState('');

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const username = values.username;
    const password = values.password;
    const email = values.email;
    const firstName = values.firstName;
    const lastName = values.lastName;
    const phone = registrationInfo.phoneNumber!;
    await Auth.signUp({
      username: username, 
      password: password, 
      attributes: {
        given_name: firstName,
        surname: lastName,
        email: email,
        phone_number: phone
      }
    });
  };

  const handlePhoneNumberChange = (validated: boolean, phoneNumber: string) => {
    if (validated) {
      registrationInfo.phoneNumber = sanitizeNumberForCognito(phoneNumber);
      setRegistrationInfo(registrationInfo);
    }
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    registrationInfo.passsword = e.target.value;
    setRegistrationInfo(registrationInfo);
  }
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    registrationInfo.firstName = e.target.value;
    setRegistrationInfo(registrationInfo);
  }

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    registrationInfo.lastName = e.target.value;
    setRegistrationInfo(registrationInfo);
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    registrationInfo.emailAddress = e.target.value;
    setRegistrationInfo(registrationInfo);
  }

  const handleTermsAndConditionsCheck = (isChecked: boolean) => {
    registrationInfo.termsAndConditionsAgreed = isChecked;
    setRegistrationInfo(registrationInfo);
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
        initialValues={{
          prefix: '86',
        }}
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
          <Input onChange={(e: ChangeEvent<HTMLInputElement>) => handleEmailChange(e)}  />
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
          <Input onChange={(e: ChangeEvent<HTMLInputElement>) => handleFirstNameChange(e)}  />
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
          <Input onChange={(e: ChangeEvent<HTMLInputElement>) => handleLastNameChange(e)}  />
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
          <Input.Password onChange={(e) => handlePasswordChange(e)} />
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
        <Input.Password onChange={(e) => handleConfirmPasswordChange(e)} />
        </Form.Item>

        <Form.Item label="Phone Number">
          <IntlTelInput
            ref={telRef}
            style={{width: '100%'}}
            onPhoneNumberChange={
              (validated: boolean,
              _b: string,
              selectedCountry: SelectedCountryInputValue,
              phoneNumber: string) => handlePhoneNumberChange(validated, phoneNumber)} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox onChange={(e) => handleTermsAndConditionsCheck(e.target.checked)}>
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