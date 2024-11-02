"use client"

import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutPage: React.FC = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const { data } = await axios.post('/api/checkoutsession', { amount: 1000 }); // misalnya $10.00

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: data.id });
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Pay $10.00</button>
    </div>
  );
};

export default CheckoutPage;
