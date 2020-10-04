import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import Router from './Router';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
      setInit(true);
    });
  }, []);

  console.log(init, isLoggedIn);

  return init ? (
    <Router isLoggedIn={isLoggedIn} currentUser={currentUser} />
  ) : (
    'Initializing...'
  );
}

export default App;
