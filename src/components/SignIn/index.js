import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

export default function SignInPage() {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <SignUpLink />
    </div>
  );
}

const SignInFormBase = props => {
  const initialInfo = {
    email: '',
    password: ''
  };

  const [info, setInfo] = useState(initialInfo);
  const [error, setError] = useState(null);

  const onSubmit = e => {
    e.preventDefault();

    props.firebase
      .doSignInWithEmailAndPassword(info.email, info.password)
      .then(authuser => {
        setInfo(initialInfo);
        props.history.push(ROUTES.HOME);
      })
      .catch(error => setError(error.message));
  };

  const onChange = e => {
    e.persist();
    setInfo(info => ({ ...info, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='email'
          value={info.email}
          onChange={onChange}
          placeholder='Email'
        />
        <input
          type='password'
          name='password'
          value={info.password}
          onChange={onChange}
          placeholder='Password'
        />
        <button type='submit'>Sign In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

const SignInForm = compose(
  withFirebase,
  withRouter
)(SignInFormBase);

export { SignInForm };
