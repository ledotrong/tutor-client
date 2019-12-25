import { types } from '../core/constants';

const initialState = {
  data: []
};
export default function messagesData(state = initialState, action) {
  switch (action.type) {
    case types.ADD_4_MESSAGES: {
      return {
        ...state, data: state.data.concat(action.data)
      };
    }
    case types.SET_4_MESSAGES: {
        console.log(typeof action,"actionnnn");
        return { data: action.data === undefined? [] : action.data};
      }
      case types.LOGOUT: {
        return {data: []};
      }
    default:
      return state;
  }
}