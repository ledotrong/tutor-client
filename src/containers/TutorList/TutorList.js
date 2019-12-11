import { connect } from 'react-redux';
import TutorList from '../../components/TutorList/TutorList';
import * as actions from '../../actions/index';

const mapStateToProps = state => ({
    allskills: state.skills.skills
  });

const mapDispatchToProps = dispatch => {
  return {
    getSkills: () =>{
        dispatch(actions.getSkills());
      }
  };
};

export default connect(
    mapStateToProps,
  mapDispatchToProps
)(TutorList);