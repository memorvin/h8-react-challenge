import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'

export const PrivateRoute = ({component: Component, ...props}) => {
  const user = useSelector(state => state.users.userId)
  const location = useLocation()

  return (
    <Route
      {...props}
      render={(props) =>
        user
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/',
            state: { referrer: location.pathname }
          }}
        />}
    />
  );
};