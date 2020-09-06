import React, {Component} from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  ReactStripeElements,
  Elements,
} from 'react-stripe-elements';
import { Row, Col, Card,
  Form, Button, Spin } from 'antd';
import { formItemLayout, tailFormItemLayout } from '../common';
import { CardForm } from './CardForm';

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

interface InitialPaymentMethodFormProps {
  stripePublicKey: string,
  onCardAdded: (e: any) => void,
  onSkipped: (e: any) => void
}
interface InitialPaymentMethodFormState {
  stripe: any,
  countdown: number
}

export default class InitialPaymentMethodForm extends Component<InitialPaymentMethodFormProps, InitialPaymentMethodFormState> {
  constructor(props: InitialPaymentMethodFormProps) {
    super(props);

    this.state = {
      stripe: null,
      countdown: 3,
    };
  }

  onCardEntered = (c: string) => {

  }

  onSkip = () => {
    
  }

  componentDidMount() {
    // componentDidMount only runs in a browser environment.
    // In addition to loading asynchronously, this code is safe to server-side render.

    // Remove our existing Stripe script to keep the DOM clean.
    // document.getElementById('stripe-script').remove();
    // You can inject a script tag manually like this,
    // or you can use the 'async' attribute on the Stripe.js v3 <script> tag.
    const stripeJs = document.createElement('script');
    stripeJs.id = 'stripe-script';
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;
    stripeJs.onload = () => {
      const countdown = setInterval(() => {
        this.setState({countdown: this.state.countdown - 1});
      }, 1000);
      // The setTimeout lets us pretend that Stripe.js took a long time to load
      // Take it out of your production code!
      setTimeout(() => {
        clearInterval(countdown);
        this.setState({
          stripe: window.Stripe(this.props.stripePublicKey),
        });
      }, 3000);
    };
    document.body && document.body.appendChild(stripeJs);
  }

  render() {
    return (
      <Row>
        <Col span={14}>
          <Card>
            <Form {...formItemLayout}>
              <span>
                Using this site requires a valid payment method. You are only charged for usage,
                so you will not be charged immediately. However, you might see a temporary $1.00
                charge on your card statement. This is for card validation only and will disappear
                usually within a few business days.
              </span>
              <Form.Item label="Confirmation Code">
                        
                <StripeProvider stripe={this.state.stripe}>
                  <Elements>
                    <CardForm onCardEntered={(c) => this.onCardEntered(c)} onSkip={() => this.onSkip()} />
                  </Elements>
                </StripeProvider>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Save Payment Method
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}