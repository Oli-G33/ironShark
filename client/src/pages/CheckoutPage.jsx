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
<<<<<<< HEAD
      .then((data) => setClientSecret(data.clientSecret));
=======
      .then((data) => {
        console.log(data);
        setClientSecret(data.clientSecret);
      });
>>>>>>> e7864511d985e52ca98ffde672ee553d6a7bbd5c
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
