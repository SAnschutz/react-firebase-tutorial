import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

export default function SignUpPage() {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
}

const SignUpFormBase = props => {
  const initialUser = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: ''
  };

  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState();

  const onSubmit = e => {
    e.preventDefault();
    console.log('submitted');
    const { username, email, passwordOne } = user;

    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        setUser(initialUser);
        props.history.push(ROUTES.HOME);
      })
      .catch(error => setError(error.message));
  };

  const onChange = e => {
    e.persist();
    setUser(user => ({ ...user, [e.target.name]: e.target.value }));
  };

  const isInvalid =
    user.passwordOne !== user.passwordTwo ||
    user.passwordOne === '' ||
    user.email === '' ||
    user.username === '';

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='username'
          value={user.username}
          onChange={onChange}
          placeholder='Full Name'
        />
        <input
          type='text'
          name='email'
          value={user.email}
          onChange={onChange}
          placeholder='Email Address'
        />
        <input
          type='password'
          name='passwordOne'
          value={user.passwordOne}
          onChange={onChange}
          placeholder='Confirm Password'
        />
        <input
          type='password'
          name='passwordTwo'
          value={user.passwordTwo}
          onChange={onChange}
          placeholder='Confirm Password'
        />
        <button type='submit' disabled={isInvalid} onSubmit={onSubmit}>
          Sign Up
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

// This works, if you don't want to use "recompose" npm module:
// const SignUpForm = withRouter(withFirebase(SignUpFormBase));
// Otherwise, below uses "recompose" (make sure to import {compose} from 'recompose')

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export { SignUpForm, SignUpLink };
