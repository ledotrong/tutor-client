import { connect } from 'react-redux';
import VerifyAccount from '../components/VerifyAccount';
import * as actions from '../actions/index';
const mapStateToProps = state => ({
  current: state.user.current
});
const mapDispatchToProps = dispatch => {
    return {
      setCurrent: number => {
        dispatch(actions.setCurrent(number));
      },
      setId: id => {
        dispatch(actions.setId(id));
      },
      setRole: role => {
        dispatch(actions.setRole(role));
      }
    };
  };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyAccount);