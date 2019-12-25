import { connect } from 'react-redux';
import ContractHistory from '../../components/ContractHistory/ContractHistory';
import * as actions from '../../actions/index';

const mapStateToProps = state => ({
    email: state.user.email,
    picture: state.user.picture,
    name: state.user.name,
    role: state.user.role
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
)(ContractHistory);