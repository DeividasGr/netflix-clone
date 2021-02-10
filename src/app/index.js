import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import UserContent from './pages/UserContent';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import SingleMovieContent from './pages/SingleMovieContent';
import { Provider } from 'react-redux';
import store from './store';
import './index.scss';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <PublicRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/usercontent" component={UserContent} />
              <PrivateRoute
                exact
                path="/singlemovie/:movieId"
                component={SingleMovieContent}
              />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    </>
  );
}

export default App;
