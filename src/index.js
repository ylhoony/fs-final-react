import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/index';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
