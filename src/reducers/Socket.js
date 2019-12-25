import io from 'socket.io-client';

import { types } from '../core/constants';

const initialState = {
  socket: io('http://localhost:4000')
};
export default function socket(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN: {
        state.socket.emit("Client-login", localStorage.getItem("usertoken"))
      return state;
    }
    case types.ADD_MESSAGE: {
      state.socket.emit("Client-send-message", action.message)
      return state;
    }
    default:
      return state;
  }
}