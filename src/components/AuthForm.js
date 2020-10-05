import React, { useState } from 'react';
import firebase from 'firebase/app';

function AuthForm() {
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

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="authInput"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="authInput"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccountMode ? 'Create Account' : 'Sign In'}
        />
        {error && <span className="authError">{error}</span>}
      </form>

      <span onClick={toggleAccount} className="authSwitch">
        {newAccountMode ? 'Sign In' : 'Create Account'}
      </span>
    </>
  );
}

export default AuthForm;
