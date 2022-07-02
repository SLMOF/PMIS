import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './Routes';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <AppRoutes history={history} />
  </React.StrictMode>,
  document.getElementById('root')
);