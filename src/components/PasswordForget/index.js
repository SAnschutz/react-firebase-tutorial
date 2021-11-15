import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </div>
);

const PasswordForgetFormBase = props => {
  const [email, setEmail] = useState('');
  const isInvalid = email === '';
  const [error, setError] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    props.firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail('');
        setError('');
      })
      .catch(error => {
        setError(error);
      });
  };

  const onChange = e => {
    e.persist();
    setEmail(e.target.value);
    setError('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='email'
        name='email'
        value={email}
        onChange={onChange}
        placeholder='Email Address'
      />
      <button type='submit' disabled={isInvalid}>
        Reset My password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forget Password?</Link>
  </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
