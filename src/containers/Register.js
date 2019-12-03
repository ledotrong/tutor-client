import { connect } from 'react-redux';
import Register from '../components/Register';
import * as actions from '../actions/index';
const mapStateToProps = state => ({
  current: state.user.current,
  id: state.user.id
});
const mapDispatchToProps = dispatch => {
  return {
    setCurrent: number => {
      dispatch(actions.setCurrent(number));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);