import React, { useState } from 'react';
import StripeContainer from '../components/StripeContainer';
// import UC2Image from './UC2Image';

const CheckoutPage = () => {
  const [showItem, setShowItem] = useState(false);

  return (
    <div>
      <h1>CheckoutPage</h1>

      {showItem ? (
        <StripeContainer />
      ) : (
        <>
          <h3>$10.00</h3>
          {/* <img src={UC2Image} alt="TheBestGame" /> */}
          <button onClick={() => setShowItem(true)}>Pay</button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
