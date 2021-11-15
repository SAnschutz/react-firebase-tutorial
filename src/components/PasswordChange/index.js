import React, { useState } from 'react';

import { withFirebase } from '../Firebase';

const PasswordChangeForm = props => {
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState('');

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  const onSubmit = e => {
    e.preventDefault();
    props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setPasswordOne('');
        setPasswordTwo('');
        setError('');
      })
      .catch(error => {
        setError(error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='password'
        value={passwordOne}
        onChange={e => {
          setPasswordOne(e.target.value);
          setError('');
        }}
        placeholder='New password'
      />
      <input
        type='password'
        value={passwordTwo}
        onChange={e => {
          setPasswordTwo(e.target.value);
          setError('');
        }}
        placeholder='Confirm new password'
      />
      <button type='submit' disabled={isInvalid}>
        Change Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default withFirebase(PasswordChangeForm);
