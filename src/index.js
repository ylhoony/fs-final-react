import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/index';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import 'uikit/dist/css/uikit.min.css';
import './index.css';

import 'uikit/dist/js/uikit.min';
import 'uikit/dist/js/uikit-icons.min';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
