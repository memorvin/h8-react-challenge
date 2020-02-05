import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

export const PrivateRoute = ({component: Component, ...rest}) => {
  const userId = useSelector(state => state.users.userId)

  return (
    <Route
      {...rest}
      render={(props) =>
        userId
        ? <Component {...props} />
        : <Redirect to={{path: '/'}} />}
    />
  );
};