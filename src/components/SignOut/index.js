import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => {
  return (
    <div>
      <button type='button' onClick={firebase.doSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default withFirebase(SignOutButton);
