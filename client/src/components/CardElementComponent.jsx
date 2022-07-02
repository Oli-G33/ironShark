import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
  hidePostalCode: true,
  style: {
    base: {
      iconColor: '#c4f0ff',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',

      color: '#fff',
      '::placeholder': {
        color: '#87BBFD'
      }
    },
    invalid: {
      color: 'red',
      iconColor: 'red'
    },
    complete: {}
  }
};

const CardElementComponent = () => {
  return (
    <div>
      <CardElement options={CARD_OPTIONS} />
    </div>
  );
};

export default CardElementComponent;
