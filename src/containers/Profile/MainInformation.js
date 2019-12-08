import { connect } from 'react-redux';
import MainInformation from '../../components/Profile/Sections/MainInformation';
import * as actions from '../../actions/index';

const mapStateToProps = state => ({
  name: state.user.name,
  address: state.user.address,
  skills: state.user.skills,
  introduction: state.user.introduction,
  email: state.user.email
});
const mapDispatchToProps = dispatch => {
  return {
    updateInfo: user => {
      dispatch(actions.updateInfo(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainInformation);