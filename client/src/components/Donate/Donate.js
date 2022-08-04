import { Button, Card } from 'antd';
import React from 'react';
import './donate.css';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants';
import products from '../../utils/products';

const Donate = () => {
  const makePayment = async ({ title, amount, qty }) => {
    const stripe = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    );

    try {
      const { data } = await axios.post(`${BASE_API_URL}/makePayment`, {
        items: [
          {
            title,
            price: +amount,
            quantity: qty,
          },
        ],
        currency: 'usd',
      });
      await stripe.redirectToCheckout({
        sessionId: data?.id,
      });
    } catch (error) {}
  };
  return (
    <div className="donation-boxes">
      {products.map(({ title, description, amount, currency, qty }, index) => {
        return (
          <Card title={title} className="donation-box" key={index}>
            <div>
              <p>{description}</p>
              <Button
                type="primary"
                onClick={() => makePayment({ title, amount, qty })}
              >
                Donate {currency}
                {amount}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Donate;
