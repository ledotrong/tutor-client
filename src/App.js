import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Switch
} from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import VerifyAccount from './containers/VerifyAccount';
import 'antd/dist/antd.css';
import './App.css';
import RegisterFB_GG from './containers/RegisterFB_GG';
const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/verifyaccount/:id" component={VerifyAccount} />
          <Route path="/registerfbgg" component={RegisterFB_GG}/>
        </Switch>
      </Router>
    </HashRouter>
  </Provider>
);
Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
