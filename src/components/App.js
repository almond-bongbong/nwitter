import React, { useState } from 'react';
import firebase from 'firebase/app';
import Router from './Router';

function App() {
  const [isLoggedIn] = useState(firebase.auth().currentUser);

  return <Router isLogged={isLoggedIn} />;
}

export default App;
