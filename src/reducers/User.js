import { types } from '../core/constants';

const initialState = {
  name: null,
  email: null,
  picture: null,
  skills: [],
  role: null,
  address: {
    address: null,
    ward: null,
    district: null,
    province: null
  },
  introduction: null,
  date: null,
  current: 0,
  logintype: null, id: null,
  usertoken: null,
  loginErr: null,
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
        address: {
          address: action.user.address.address,
          ward:  action.user.address.ward,
          district: action.user.address.district,
          province: action.user.address.province},
        current: action.user.current,
        loginErr: null,
        id: action.user._id,
        introduction: action.user.introduction
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
    ward:  null,
    district: null,
    province: null},
  date: null,
  current: 0,
  logintype: null,
  id: null,
  introduction: null
      };
    }
    case types.UPDATE_INFO: {
      return {
        ...state,
        name: action.user.name,
        skills: action.user.skills,
        address: action.user.address,
        introduction: action.user.introduction,
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
    case types.UPDATE_PICTURE: {
      return {...state, picture: action.picture};
    }
    default:
      return state;
  }
}
