import { connect } from 'react-redux';
import RegisterFB_GG from '../components/RegisterFB_GG';
import * as actions from '../actions/index';

const mapStateToProps = state => ({
  email: state.user.email,
  name: state.user.name,
  logintype: state.user.logintype,
  id : state.user.id
});
const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(actions.getUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterFB_GG);