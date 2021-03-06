import { connect } from 'react-redux';
import Profile from '../../components/Profile/Profile';
import * as actions from '../../actions/index';

const mapStateToProps = state => ({
    email: state.user.email,
    name: state.user.name,
    picture: state.user.picture
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
)(Profile);