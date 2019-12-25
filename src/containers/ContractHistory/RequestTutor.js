import { connect } from 'react-redux';
import RequestTutor from '../../components/ContractHistory/Sections/RequestTutor';

const mapStateToProps = state => ({
    role : state.user.role
  });


export default connect(
    mapStateToProps
)(RequestTutor);