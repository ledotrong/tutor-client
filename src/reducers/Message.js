import { types } from '../core/constants';

const initialState = {
  userID: null,
    name: null,
    picture: null,
    messages: [],
    isChat: false
};
export default function message(state = initialState, action) {
  switch (action.type) {
    case types.SET_MESSAGES: {
      console.log("kk",action.data)
      return {...state,
        userID: action.data.data.user._id,
        picture: action.data.data.user.picture,
        name: action.data.data.user.name,
        messages: action.data.data.messages[0]? action.data.data.messages[0].message : []
      };
    }
    case types.ADD_MESSAGE_CLIENT: {
      console.log("action addmessageclient", action)
        return {
            ...state, messages: [...state.messages,action.message]
        };
    }
    case types.ADD_MESSAGE: {
      action.message.message.author = "me";
        return {
            ...state, messages: [...state.messages,action.message.message]
        };
    }
    case types.SWITCH_IS_CHAT:{
        return {...state, isChat: action.data};
    }
    case types.LOGOUT: {
      return {
        userID: null,
    name: null,
    picture: null,
    messages: [],
    isChat: false
      }
    }
    default:
      return state;
  }
}