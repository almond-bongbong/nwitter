import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';

function Router({ isLoggedIn, currentUser }) {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home currentUser={currentUser} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </HashRouter>
  );
}

export default Router;
