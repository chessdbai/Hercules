import React, {Component} from 'react';
import {CardElement, injectStripe, ReactStripeElements} from 'react-stripe-elements';
import {
  Row, 
  Col, 
  Card,
  Form,
  Button
} from 'antd';

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

interface PaymentInfo {
  stripeCardToken?: string
}

interface CardFormProps {
  onCardEntered: (e: any) => void;
  onSkip: (e: any) => void;
}

class CardFormWithoutStripe extends Component<CardFormProps & ReactStripeElements.InjectedStripeProps> {
  constructor(props: any) {
    super(props);
  }
  handleSubmit(evt: any) {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(this.props.onCardEntered);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  render() {

    return (
      <Col span={14}>
        <div className="checkout">
          <Form.Item>
            <p>Would you like to add a payment method now?</p>
          </Form.Item>
          <Form.Item>
            <CardElement />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button htmlType='submit' type='primary' onClick={(e: any) => this.handleSubmit(e)}>Continue</Button>
            <Button onClick={this.props.onSkip}>Not Now</Button>
          </Form.Item>
        </div>
      </Col>
    );
  }
}

export const CardForm = injectStripe(CardFormWithoutStripe);