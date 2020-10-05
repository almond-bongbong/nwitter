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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          className="formInput"
          autoFocus
          value={newDisplayName}
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Log Out
      </span>
    </div>
  );
}

export default Profile;
