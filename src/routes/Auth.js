import React, { useState } from 'react';
import firebase from 'firebase/app';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccountMode, setNewAccountMode] = useState(false);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const toggleAccount = () => {
    setNewAccountMode((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (newAccountMode) {
        const data = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        console.log(data);
      } else {
        const data = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

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
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <button type="submit">
          {newAccountMode ? 'Create account' : 'Log in'}
        </button>
      </form>
      {error}
      <div>
        <button type="button" onClick={toggleAccount}>
          {newAccountMode ? 'Sign in' : 'Create account'}
        </button>
      </div>
      <div>
        <button type="button" name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button type="button" name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
}

export default Auth;
