import { connect } from 'react-redux';
import MHeader from '../../components/Header/MHeader';
import * as actions from '../../actions/index';

const mapStateToProps = state => ({
  email: state.user.email,
  picture: state.user.picture,
  role: state.user.role,
  messagesData: state.messagesData.data,
  newMessages: state.user.newMessages
});
const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(actions.logOut());
    },
    getUser: () => {
      dispatch(actions.getUser());
    },
    switchIsChat: (data)=>{
      dispatch(actions.switchIsChat(data));
    },
    getMessages: (data)=>{
      dispatch(actions.getMessage(data));
    },
    add4Messages: (data) =>{
      dispatch(actions.add4Messages(data));
    },
    set4Messages: (data) =>{
      dispatch(actions.set4Messages(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MHeader);