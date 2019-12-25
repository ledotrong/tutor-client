import { connect } from 'react-redux';
import TutorsInfo from '../../components/TutorList/Sections/TutorsInfo';

const mapStateToProps = state => ({
    role : state.user.role
  });


export default connect(
    mapStateToProps
)(TutorsInfo);