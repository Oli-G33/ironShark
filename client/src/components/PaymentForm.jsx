import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import BillingDetailsFields from './BillingDetailsFields';
import CardElementComponent from './CardElementComponent';
import Row from './Row';
import SubmitButton from './SubmitButton';

const PaymentForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async e => {
    const billingDetails = {
      name: e.target.name.value,
      email: e.target.email.value
    };
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails
    });

    setProcessingTo(true);

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:3010/payment', {
          amount: price * 100,
          id
        });

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <Row>
                <BillingDetailsFields />
              </Row>

              <CardElementComponent />
            </div>
          </fieldset>
          <Row>
            <SubmitButton disabled={isProcessing}>
              {isProcessing ? 'Processing...' : `Pay €${price}`}
            </SubmitButton>
          </Row>
        </form>
      ) : (
        <div>
          <h2>
            Your Payment Has Been Successful. Thank you for your purchase!
          </h2>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
