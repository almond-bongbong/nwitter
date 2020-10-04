import React, { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { NWEETS_COLLECTION } from '../constants/firestore';
import { useCurrentUser } from '../contexts/CurrentUserContext';

function Profile() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [newDisplayName, setNewDisplayName] = useState(
    firebase.auth().currentUser.displayName || ''
  );

  const getMyNweets = useCallback(async () => {
    const data = await firebase
      .firestore()
      .collection(NWEETS_COLLECTION)
      .where('createdBy', '==', firebase.auth().currentUser.uid)
      .orderBy('createdAt', 'desc')
      .get();
    const nweets = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(nweets);
  }, []);

  useEffect(() => {
    getMyNweets();
  }, [getMyNweets]);

  const onLogoutClick = () => {
    firebase.auth().signOut();
  };

  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (firebase.auth().currentUser.displayName !== newDisplayName) {
      await firebase.auth().currentUser.updateProfile({
        displayName: newDisplayName,
      });
      setCurrentUser({
        ...currentUser,
        name: newDisplayName,
      });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <button>Update Profile</button>
      </form>
      <button onClick={onLogoutClick}>Log out</button>
    </div>
  );
}

export default Profile;
