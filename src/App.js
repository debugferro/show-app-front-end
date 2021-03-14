import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import checkAuthentication from './requests/check_authentication';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthentication()); // Checking if user is logged-in
  }, []);

  const isAuthenticated = useSelector((state) => state.user.entity.isAuthenticated);

  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Logo />
        <TabBar />
        <div className={styles.container}>
          <Switch>
            <Route exact path="/" component={Index} />
            {isAuthenticated ?
              [
                <Route exact path="/logout" component={LogOut} />,
                <Route path="/cocktails/new" component={New} />,
              ]
              :
              [
                <Route exact path="/signup" component={SignUp} />,
                <Route exact path="/login" component={Login} />
              ]
            }
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
