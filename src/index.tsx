import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCKH_LPp47GMwT8Nwh9S8I2MQTt7J_O3xM",
  authDomain: "ai-lit-rabbits.firebaseapp.com",
  projectId: "ai-lit-rabbits",
  storageBucket: "ai-lit-rabbits.appspot.com",
  messagingSenderId: "16828976693",
  appId: "1:16828976693:web:d29182728ec4db7e80ab7c"
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
