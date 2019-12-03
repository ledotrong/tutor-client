import { connect } from 'react-redux';
import Login from '../components/Login';
import * as actions from '../actions/index';

const mapStateToProps = state => ({
  email: state.user.email,
  usertoken: state.user.usertoken,
  loginErr: state.user.loginErr,
  current: state.user.current,
  logintype: state.user.logintype
});
const mapDispatchToProps = dispatch => {
  return {
    login: user => {
      dispatch(actions.loginRequest(user));
    },
    getUser: () => {
      dispatch(actions.getUser());
    },
    loginfb: data => {
      dispatch(actions.loginFbRequest(data));
    },
    logingg: data => {
      dispatch(actions.loginGgRequest(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);