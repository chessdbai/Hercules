import React, {ChangeEvent} from 'react';
import { Auth } from 'aws-amplify';
import { Row, Col, Card,
  Form, Input, Button } from 'antd';
import { errorStyle, formItemLayout, tailFormItemLayout, createErrorComponent } from './common';

interface ConfirmPhoneNumberProps {
  username: string,
  phoneNumber: string,
  onConfirmed: () => void;
}

interface ConfirmPhoneNumberState {
  confirmationCode: string,
  confirmationError: any,
  hasSubmittedOnce: boolean
}

export class ConfirmPhoneNumber extends React.Component<ConfirmPhoneNumberProps, ConfirmPhoneNumberState> {

  constructor(props: ConfirmPhoneNumberProps) {
    super(props);
    this.state = {
      confirmationCode: '',
      confirmationError: '',
      hasSubmittedOnce: false
    }
  }

  async handleConfirmSubmit() {
    try {
      await Auth.confirmSignUp(this.props.username, this.state.confirmationCode, {
          // Optional. Force user confirmation irrespective of existing alias. By default set to True.
          forceAliasCreation: true    
      });
      this.props.onConfirmed();
    } catch (err) {
      this.setState({confirmationError: err});
    }
  }

  handleCodeChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({confirmationCode: e.target.value});
  }

  getLastFourPhoneDigits() {
    var pn = this.props.phoneNumber;
    var len = this.props.phoneNumber.length;
    return pn.substring(len-4, len);
  }

  render() {
    return (
      <Row>
        <Col span={14}>
          <Card>
            <Form {...formItemLayout} onFinish={(e: any) => this.handleConfirmSubmit()}>
              <span>We sent a confirmation code to the phone number you entered ending in {this.getLastFourPhoneDigits()}. Enter it below to complete registration.</span>
              <Form.Item label="Confirmation Code">
                <Input onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleCodeChange(e)} />
              </Form.Item>
              {this.getErrorMessageComponent()}
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Confirm Phone Number
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }

  getErrorMessageComponent() : React.ReactNode {

    if (!this.state.hasSubmittedOnce) {
      return <></>;
    }

    var errorComponent : React.ReactNode = null;
    if (this.state.confirmationError !== undefined) {
      errorComponent = (<>{'The confirmation code you provided was invalid.'}</>);
    }

    if (errorComponent == null) {
      return <></>;
    }
    return createErrorComponent(errorComponent);
  }

}