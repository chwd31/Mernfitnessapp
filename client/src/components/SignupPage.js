import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput) {
    signup(input: $input) {
      token
      user {
        _id
        username
        email
        exercises {
          _id
          name
          description
        }
        profile {
          _id
          name
          age
          height
          weight
        }
      }
    }
  }
`;

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const [signupMutation, { error }] = useMutation(SIGNUP_MUTATION);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleSignup = () => {
    signupMutation({
      variables: {
        input: {
          email,
          password,
          name,
          age: parseInt(age),
          weight: parseFloat(weight),
          height: parseFloat(height),
        },
      },
    })
      .then((response) => {
        const { token, user } = response.data.signup;
        setSignupSuccess(true);
        setEmail('');
        setPassword('');
        setName('');
        setAge('');
        setWeight('');
        setHeight('');
      })
      .catch((error) => {
        console.error('Error occurred signing up:', error);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      {signupSuccess ? (
        <p>Signup successful! You can now login with your new account.</p>
      ) : (
        <form onSubmit={handleSignup}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Age:
            <input type="number" value={age} onChange={handleAgeChange} />
          </label>
          <br />
          <label>
            Weight in lbs:
            <input type="number" value={weight} onChange={handleWeightChange} />
          </label>
          <br />
          <label>
            Height in inches:
            <input type="number" value={height} onChange={handleHeightChange} />
          </label>
          <br />
          <button type="submit">Signup</button>
        </form>
      )}
      {error && <p>Error occurred while signing up: {error.message}</p>}
    </div>
  );
};

export default SignupPage;
