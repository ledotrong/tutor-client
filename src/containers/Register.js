import { connect } from 'react-redux';
import Register from '../components/Register';
import * as actions from '../actions/index';
const mapStateToProps = state => ({
  current: state.user.current,
  id: state.user.id,
  skills: state.skills.skills,
  role: state.user.role
});
const mapDispatchToProps = dispatch => {
  return {
    setCurrent: number => {
      dispatch(actions.setCurrent(number));
    },
    getSkills: () =>{
      dispatch(actions.getSkills());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);