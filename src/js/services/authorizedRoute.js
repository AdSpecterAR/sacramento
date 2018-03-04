import React, { Component }       from 'react';
import {
  Route,
  Redirect
}                                 from 'react-router-dom';
import Session                    from './session';

const AuthorizedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Session.isLoggedIn() === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
    )}
  />
);

export default AuthorizedRoute;
