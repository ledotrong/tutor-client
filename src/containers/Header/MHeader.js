import { connect } from 'react-redux';
import MHeader from '../../components/Header/MHeader';
import * as actions from '../../actions/index';

const mapStateToProps = state => ({
  email: state.user.email,
  picture: state.user.picture
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
)(MHeader);