import { connect } from 'react-redux';
import Home from '../components/Home';
import * as actions from '../actions/index';

const mapStateToProps = state => ({
  role: state.user.role,
  email: state.user.email,
  name: state.user.name,
  address: state.user.address,
  skills: state.user.skills,
  socket: state.socket.socket
});
const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(actions.logOut());
    },
    getUser: () => {
      dispatch(actions.getUser());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);