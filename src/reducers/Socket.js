import io from 'socket.io-client';

import { types } from '../core/constants';

const initialState = {
  socket: io('http://localhost:4000'/*'https://tutorclientapi.herokuapp.com'*/)
};
export default function socket(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN: {
      console.log("LOGINNNNNNN",localStorage.getItem("usertoken") )
        state.socket.emit("Client-login", localStorage.getItem("usertoken"))
      return state;
    }
    case types.ADD_MESSAGE: {
      console.log("hihihiiiii", action.message)
      state.socket.emit("Client-send-message", action.message)
      return state;
    }
    case types.LOGOUT: {
      state.socket.emit("Client-disconnect");
      return state;
    }
    default:
      return state;
  }
}