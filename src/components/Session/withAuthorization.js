import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorizationBase = condition => Component => props => {
  props.firebase.auth.onAuthStateChanged(authUser => {
    if (!condition(authUser)) {
      props.history.push(ROUTES.SIGN_IN);
    }
  });

  return (
    <AuthUserContext.Consumer>
      {authUser => (condition(authUser) ? <Component {...props} /> : null)}
    </AuthUserContext.Consumer>
  );
};

const withAuthorization = condition => Component => {
  return compose(
    withRouter,
    withFirebase
  )(withAuthorizationBase);
};

export default withAuthorization;
