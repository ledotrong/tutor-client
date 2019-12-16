import { connect } from 'react-redux';
import ChangePassword from '../../components/Profile/Sections/ChangePassword';
import * as actions from '../../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    logout: ()=>{
      dispatch(actions.logOut());
    }
  };
};

export default connect(
  mapDispatchToProps
)(ChangePassword);