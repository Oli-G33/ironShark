import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './../components/CheckoutForm';
import { useLocation } from 'react-router-dom';
import './CheckoutPage.scss';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const location = useLocation();
  const { price, gameTitle, gameUrl } = location.state;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('https://iron-shark.herokuapp.com/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price, gameTitle })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [price, gameTitle]);

  const appearance = {
    theme: 'night'
  };
  const options = {
    clientSecret,
    appearance
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm price={price} gameTitle={gameTitle} gameUrl={gameUrl} />
        </Elements>
      )}
      <div>
        <p id="checkoutSmall">
          {' '}
          Tip: You can use the test card number 4242 4242 4242 4242, a random
          future expiration date, plus any 3 digit security code
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
