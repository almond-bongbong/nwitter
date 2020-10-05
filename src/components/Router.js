import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Auth from '../routes/Auth';

function Router({ isLoggedIn }) {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation />}
      {isLoggedIn ? <PrivateRouter /> : <PublicRouter />}
    </HashRouter>
  );
}

const PrivateRouter = () => (
  <div
    style={{
      maxWidth: 890,
      width: '100%',
      margin: '0 auto',
      marginTop: 80,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
    </Switch>
  </div>
);

const PublicRouter = () => (
  <>
    <Route exact path="/">
      <Auth />
    </Route>
    <Redirect from="*" to="/" />
  </>
);

export default Router;
