import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import BillingDetailsFields from './BillingDetailsFields';
import CardElementComponent from './CardElementComponent';
import Row from './Row';
import SubmitButton from './SubmitButton';
import Confetti from 'react-confetti';
import styled from '@emotion/styled';

const PaymentForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });

  const Container = styled.div`
    width: 50%;
    margin: 30px auto 0 auto;
    text-align: center;
    color: #fff;
  `;

  const Title = styled.div`
    font-size: 58px;
  `;

  const Message = styled.div`
    margin-top: 40px;
  `;

  const handleSubmit = async (e) => {
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
  const formatPrice = (price) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
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
              {isProcessing ? 'Processing...' : `Pay ${formatPrice(price)}`}
            </SubmitButton>
          </Row>
        </form>
      ) : (
        <div>
          <Container>
            <Confetti width={width} height={height} numberOfPieces={300} />
            <Title>Thank you for your purchase!</Title>
            <Message>You will receive a download link by email</Message>
          </Container>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
