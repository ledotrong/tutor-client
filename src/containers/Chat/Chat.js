import { connect } from 'react-redux';
import Chat from '../../components/Chat/Chat';
import * as actions from '../../actions/index';

const mapStateToProps = state =>{
  return{
    name: state.message.name,
    picture: state.message.picture,
    messages: state.message.messages,
    socket: state.socket.socket,
    isChat: state.message.isChat,
    userID: state.message.userID,
    id: state.user.id,
    newMessages: state.user.newMessages
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addMessage: (data)=>{
        dispatch(actions.addMessageRequest(data));
    },
    getMessages: (data)=>{
      dispatch(actions.getMessage(data));
    },
    addMessageClient: (message)=>{
      dispatch(actions.addMessageClient(message));
    },
    set4Messages: (data)=>{
      dispatch(actions.set4Messages(data));
    },
    setNumOfNewMessages: (data)=>{
      dispatch(actions.setNumOfNewMessages(data));
    },
    switchIsChat: (data)=>{
      dispatch(actions.switchIsChat(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);