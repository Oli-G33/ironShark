import React, { useState } from 'react';
import StripeContainer from '../components/StripeContainer';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const [showItem, setShowItem] = useState(false);
  const location = useLocation();
  const { price } = location.state;

  const formatPrice = price =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);

  return (
    <div>
      <h1>CheckoutPage</h1>

      {showItem ? (
        <StripeContainer price={price} />
      ) : (
        <>
          <h3>{formatPrice(price)}</h3>
          {/* <img src={UC2Image} alt="TheBestGame" /> */}
          <button onClick={() => setShowItem(true)}>Pay</button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
