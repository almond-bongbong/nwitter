import React from 'react';
import firebase from 'firebase/app';

function Profile() {
  const onLogoutClick = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
      <button onClick={onLogoutClick}>Log out</button>
    </div>
  );
}

export default Profile;
