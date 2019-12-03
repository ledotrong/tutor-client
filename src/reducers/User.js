import { types } from '../core/constants';

const initialState = {
  name: null,
  usertoken: null,
  loginErr: null,
  email: null,
  picture: null,
  skills: [],
  role: null,
  address: null,
  date: null,
  current: 0,
  logintype: null, id: null
};
export default function user(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN: {
      return {
        ...state,
        name: action.user.name,
        usertoken: action.user.token,
        email: action.user.email,
        picture: action.user.picture,
        skills: action.user.skills,
        role: action.user.role,
        address: action.user.address, 
        current: action.user.current,
        loginErr: null,
        id: action.user._id
      };
    }
    case types.LOGIN_ERR: {
      return { ...state, loginErr: action.err };
    }
    case types.LOGOUT: {
      return {
        name: null,
  usertoken: null,
  loginErr: null,
  email: null,
  picture: null,
  skills: [],
  role: null,
  address: null,
  date: null,
  current: 0,
  logintype: null,
  id: null
      };
    }
    case types.UPDATE_INFO: {
      return {
        ...state,
        name: action.name,
        skills: action.skills,
        address: action.address,
        current: 4
      };
    }
    case types.UPDATE_INFO_ERR: {
      return { ...state, updateInfoErr: action.err };
    }
    case types.SET_CURRENT: {
        return {...state, current: action.number};
    }
    case types.SET_LOGINTYPE: {
      console.log("action",action);
      return {...state, logintype: action.logintype};
    }
    case types.SET_ID: {
      return {...state, id: action.id};
    }
    default:
      return state;
  }
}
