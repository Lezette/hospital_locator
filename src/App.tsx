import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Map from './components/Map';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/map" component={Map} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </ApolloProvider>
  );
};
export default App;
