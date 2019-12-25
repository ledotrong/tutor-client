import { connect } from 'react-redux';
import UserDetail from '../../components/UserDetail/UserDetail';
import * as actions from '../../actions/index';

const mapStateToProps = state =>{
  return {
    userID: state.message.userID,
    id: state.user.id
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMessage: (id) =>{
        dispatch(actions.getMessage(id));
      },
    switchIsChat: (data)=>{
        dispatch(actions.switchIsChat(data));
    }
  };
};

export default connect(
    mapStateToProps,
  mapDispatchToProps
)(UserDetail);