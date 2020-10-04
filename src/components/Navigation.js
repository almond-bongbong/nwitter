import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

function Navigation() {
  const { currentUser } = useCurrentUser();

  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">{currentUser.name}'s Profile</Link>
      </li>
    </ul>
  );
}

export default Navigation;
