import React, { useState } from 'react';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

const withAuthenticationBase = Component => props => {
  const [authUser, setAuthUser] = useState(null);

  props.firebase.auth.onAuthStateChanged(authUser => {
    authUser ? setAuthUser(authUser) : setAuthUser(null);
  });

  return (
    <AuthUserContext.Provider value={authUser}>
      <Component {...props} />
    </AuthUserContext.Provider>
  );
};

const withAuthentication = Component =>
  withFirebase(withAuthenticationBase(Component));

export default withAuthentication;
