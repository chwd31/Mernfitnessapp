import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LOGIN = gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        token
      }
    }
  `;

  const [login, { error }] = useMutation(LOGIN);
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    login({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
      .then((response) => {
        const { token } = response.data.login;
        localStorage.setItem('token', token);
        history.push('/'); // Redirect to homepage after successful login
      })
      .catch((error) => {
        console.error('Error occurred logging in:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      {error && <p>Error occurred while logging in: {error.message}</p>}
    </div>
  );
};

export default LoginPage;
