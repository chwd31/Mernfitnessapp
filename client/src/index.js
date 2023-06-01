import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { setContext } from '@apollo/client/link/context';
import './index.css';
import './App.css';
import App from './App';

const stripePromise = loadStripe('pk_test_51N9GI3HfMu1TGSRk8pzPyHlcjvLSKxBPFBCabnywcWvobZQaU2FAzw2dub59w55XDbSeEA5oA143x1PVaHXnxmpq00xTYUKWlb');

// Create an http link
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL server URL
});

// Retrieve the token from local storage
const token = localStorage.getItem('authToken');

// Set the token as a default header in Apollo Client
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Set the token as "Bearer <token>" or an empty string
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </ApolloProvider>
  </React.StrictMode>
);


