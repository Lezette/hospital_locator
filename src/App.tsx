import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Map from './components/Map';
const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/map" component={Map} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
};
export default App;
