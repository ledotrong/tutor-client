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
import Profile from './containers/Profile/Profile';
import TutorList from './containers/TutorList/TutorList';
import UserDetail from './containers/UserDetail/UserDetail';
import ForgotPassword from './components/ForgotPassword';
import ContractHistory from './containers/ContractHistory/ContractHistory';
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
          <Route path="/profile" component={Profile}/>
          <Route path="/verifyaccount/:id/:role" component={VerifyAccount} />
          <Route path="/registerfbgg" component={RegisterFB_GG}/>
          <Route path="/tutorlist" component={TutorList}/>
          <Route path="/userdetail/:_id" component={UserDetail}/>
          <Route path='/forgotpassword' component={ForgotPassword}/>
          <Route path='/contracthistory' component={ContractHistory}/>
        </Switch>
      </Router>
    </HashRouter>
  </Provider>
);
Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
