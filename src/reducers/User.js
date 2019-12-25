import { types } from '../core/constants';

const initialState = {
  name: null,
  email: null,
  picture: null,
  skills: [],
  role: null,
  address: {
    address: null,
    district: null,
    province: null
  },
  introduction: null,
  date: null,
  current: 0,
  logintype: null, id: null,
  usertoken: null,
  loginErr: null,
  wages: 0,
  newMessages: 0
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
        address: action.user.address===undefined?{address: null,district: null,province: null}: action.user.address,
        current: action.user.current,
        loginErr: null,
        id: action.user._id,
        wages: action.user.wages,
        introduction: action.user.introduction,
        newMessages: action.user.newMessages
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
  address: {
    address: null,
    district: null,
    province: null},
  date: null,
  current: 0,
  logintype: null,
  id: null,
  introduction: null,
  wages : 0,
  newMessages: 0
      };
    }
    case types.UPDATE_INFO: {
      return {
        ...state,
        name: action.user.name,
        skills: action.user.skills,
        address: action.user.address===undefined?{address: null,district: null,province: null}: action.user.address,
        introduction: action.user.introduction,
        wages: action.user.wages,
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
      return {...state, logintype: action.logintype};
    }
    case types.SET_ID: {
      return {...state, id: action.id};
    }
    case types.SET_ROLE: {
      return {...state, role: action.role};
    }
    case types.UPDATE_PICTURE: {
      return {...state, picture: action.picture};
    }
    case types.SET_NUM_OF_NEW_MESSAGES: {
      return {...state, newMessages: action.data};
    }
    default:
      return state;
  }
}
