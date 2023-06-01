import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useMutation, gql } from '@apollo/client';

const PROCESS_PAYMENT = gql`
  mutation ProcessPayment($input: PaymentInput) {
    processPayment(input: $input) {
      success
      paymentIntentId
      clientSecret
      error
    }
  }
`;

const Footer = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State variable to track form visibility

  const [processPayment, { error }] = useMutation(PROCESS_PAYMENT);

  const handleContribute = () => {
    setShowPaymentForm(true); // Show payment form on button click
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: name,
      },
    });

    if (!error && paymentMethod) {
      const input = {
        amount: parseFloat(amount) * 100, // Convert amount to cents
        paymentMethodId: paymentMethod.id,
      };

      processPayment({ variables: { input } })
        .then((response) => {
          const { success, paymentIntentId, clientSecret, error } = response.data.processPayment;
          if (success) {
            console.log('Payment succeeded!');
          } else {
            console.error('Payment failed:', error);
          }
        })
        .catch((error) => {
          console.error('Error occurred during payment:', error);
        });
    } else {
      console.error('Error:', error);
    }
  };

  return (
    <footer>
      <p>© 2023 Fitness App. Created by ??? and ???</p>
      <p>
        Please contribute to this project by clicking&nbsp;
        <button onClick={handleContribute}>Here</button>
      </p>
      {showPaymentForm && (
        <form onSubmit={handlePaymentSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Amount:
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <br />
          <CardElement />
          <br />
          <button type="submit">Contribute</button>
        </form>
      )}
      {error && <p>Error occurred during payment: {error.message}</p>}
    </footer>
  );
};

export default Footer;
