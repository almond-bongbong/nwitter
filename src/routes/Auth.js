import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import firebase from 'firebase/app';
import AuthForm from '../components/AuthForm';

function Auth() {
  const onSocialClick = async (e) => {
    const { name } = e.target;
    let provider;

    if (name === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    }
    if (name === 'github') {
      provider = new firebase.auth.GithubAuthProvider();
    }

    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button type="button" onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button type="button" onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
}

export default Auth;
