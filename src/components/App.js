import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import Router from './Router';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setInit(true);
    });
  }, []);

  console.log(init, isLoggedIn);

  return init ? <Router isLoggedIn={isLoggedIn} /> : 'Initializing...';
}

export default App;
