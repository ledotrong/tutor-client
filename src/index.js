
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

(function() {
  var childProcess = require("child_process");
  var oldSpawn = childProcess.spawn;
  function mySpawn() {
      console.log('spawn called');
      console.log(arguments);
      var result = oldSpawn.apply(this, arguments);
      return result;
  }
  childProcess.spawn = mySpawn;
})();
const redux = require('redux');

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
const store = redux.createStore(
  rootReducer,
  composeEnhancer(redux.applyMiddleware(thunk))
);
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(<App store={store} />, document.getElementById('root'));
serviceWorker.unregister();
