import React from 'react';
import ReactDOM from 'react-dom';
import { Router as BrowserRouter } from 'react-router-dom';
import browserHistory from './browser-history';
import App from './components/app/app';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={browserHistory}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'));
