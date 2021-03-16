import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import checkAuthentication from './requests/check_authentication';

import Index from './screens/index';
import Login from './screens/login';
import Logout from './screens/logout';
import Signup from './screens/signup';
import Scheduler from './screens/scheduler';

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
          {isAuthenticated ?
            [
              <Route exact path="/" component={Index} />,
              <Route exact path="/logout" component={Logout} />,
              <Route exact path="/scheduler" component={Scheduler} />
            ]
            :
            [
              <Route exact path="/" component={Login} />,
              <Route exact path="/signup" component={Signup} />
            ]
          }
          </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
