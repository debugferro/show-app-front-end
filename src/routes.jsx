import React from 'react';
import { Route } from 'react-router-dom';

import Index from './screens/index';
import Login from './screens/login';
import Logout from './screens/logout';
import Signup from './screens/signup';
import Scheduler from './screens/scheduler';

export const UserRoutes = () => (
  <>
    <Route exact path="/" component={Index} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/scheduler" component={Scheduler} />
  </>
)

export const PublicRoutes = () => (
  <>
    <Route exact path="/" component={Login} />
    <Route exact path="/signup" component={Signup} />
  </>
)
