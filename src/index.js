import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootswatch/dist/superhero/bootstrap.min.css'
import './enviroment/firebaseconfig'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

reportWebVitals();