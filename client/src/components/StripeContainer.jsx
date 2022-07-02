import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripeTestPromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const StripeContainer = props => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm price={props.price} />
    </Elements>
  );
};

export default StripeContainer;
