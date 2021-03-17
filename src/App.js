import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import checkAuthentication from './requests/check_authentication';

import { UserRoutes, PublicRoutes } from './routes';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthentication()); // Checking if user is logged-in
  }, []);

  const isAuthenticated = useSelector((state) => state.user.entity.is_authenticated);

  return (
    <>
      <BrowserRouter>
          <Switch>
          {isAuthenticated ? <UserRoutes /> : <PublicRoutes />}
          </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
