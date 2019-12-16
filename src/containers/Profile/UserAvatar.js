import { connect } from 'react-redux';
import UserAvatar from '../../components/Profile/Sections/UserAvatar';
import * as actions from '../../actions/index';

const mapStateToProps = state => ({
  picture: state.user.picture
});
const mapDispatchToProps = dispatch => {
  return {
    updatePicture: picture => {
      dispatch(actions.updatePicture(picture));
    },
    logout: ()=>{
      dispatch(actions.logOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAvatar);