import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';

ReactDOM.render(
  <Provider store={store}>
  	<AppRouter />
  </Provider>,
  document.getElementById('root')
);