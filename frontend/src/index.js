// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';  // Corrected path
import reportWebVitals from './reportWebVitals';  // If you're using reportWebVitals, else remove this line

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();  // If you're using reportWebVitals, else remove this line
