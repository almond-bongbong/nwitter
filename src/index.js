import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import App from './components/App';
import { firebaseConfig } from './config/firebase';

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
