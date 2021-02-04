import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import UserContent from './pages/UserContent';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import SingleMovieContent from './pages/SingleMovieContent';
import './index.scss';

function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorites = (id) => {
    if (favorites.includes(id)) {
      const newFavorites = favorites.filter((favorite) => favorite !== id);
      setFavorites(newFavorites);
    } else {
      setFavorites(favorites.concat(id));
    }
  };

  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <PublicRoute exact path="/">
              <Home favorites={favorites} toggleFavorites={toggleFavorites} />
            </PublicRoute>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/usercontent">
              <UserContent
                favorites={favorites}
                toggleFavorites={toggleFavorites}
              />
            </PrivateRoute>
            <PrivateRoute exact path="/singlemovie/:movieId">
              <SingleMovieContent
                favorites={favorites}
                toggleFavorites={toggleFavorites}
              />
            </PrivateRoute>
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
