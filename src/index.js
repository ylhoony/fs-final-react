import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import App from './App';

import 'uikit/distcss/uikit.min.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

// const store = createStore();

ReactDOM.render(
  <App />,
  document.getElementById('root'));
registerServiceWorker();
