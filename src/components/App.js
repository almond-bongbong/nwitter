import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import Router from './Router';
import { useCurrentUser } from '../contexts/CurrentUserContext';

function App() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [init, setInit] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        });
      } else {
        setCurrentUser(null);
      }
      setInit(true);
    });
  }, [setCurrentUser]);

  return init ? (
    <Router isLoggedIn={!!currentUser} currentUser={currentUser} />
  ) : (
    'Initializing...'
  );
}

export default App;
