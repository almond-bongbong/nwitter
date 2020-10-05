import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './components/App';
import './config/firebase';
import { CurrentUserProvider } from './contexts/CurrentUserContext';

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
