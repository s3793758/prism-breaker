const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Router = express.Router();

Router.post('/makePayment', async (req, res) => {
  console.log('getting data', req.body);
  const { items, currency } = req.body;
  const lineItems = items.map(({ title, price, quantity }) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: title,
        },
        unit_amount: Math.ceil(price * 100),
      },
      quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}`,
  });
  console.log({ session });
  res.send({
    id: session.id,
  });
});

module.exports = Router;
