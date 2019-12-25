import { combineReducers } from 'redux';
import user from './User';
import socket from './Socket';
import skills from './Skills';
import message from './Message';
import messagesData from './MessagesData';
const rootReducer = combineReducers({
  user,
  skills,
  socket,
  message,
  messagesData
});
export default rootReducer;