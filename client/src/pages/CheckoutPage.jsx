import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './../components/CheckoutForm';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const location = useLocation();
  const { price, id } = location.state;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('http://localhost:3010/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);

  const appearance = {
    theme: 'flat'
  };
  const options = {
    clientSecret,
    appearance
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm price={formatPrice(price)} gameId={id} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
