import { types } from '../core/constants';
import * as callApi from '../utils/apiCaller';

export const login = user => ({
    type: types.LOGIN,
    user
  });
  export const loginErr = err => ({
    type: types.LOGIN_ERR,
    err
  });
  export const loginFbRequest = data => {
    return dispatch => {
      return callApi
        .callApiLoginFb(data)
        .then(res => {
          localStorage.setItem('usertoken', res.data.token);
          console.log("res.data", res.data);
          if (res.data.activated === false) dispatch(setLogintype("facebook"));
          dispatch(login(res.data));
          
        })
        .catch(err => {
          dispatch(loginErr(err.response));
        });
    };
  };
  export const loginGgRequest = data => {
    return dispatch => {
      return callApi
        .callApiLoginGg(data)
        .then(res => {
          localStorage.setItem('usertoken', res.data.token);
          dispatch(login(res.data));
          if (res.data.activated === false) dispatch(setLogintype("google"));
        })
        .catch(err => {
          dispatch(loginErr(err.response.data));
        });
    };
  };
  export const logout = () => ({
    type: types.LOGOUT
  });
  export const loginRequest = user => {
    return dispatch => {
      return callApi
        .callApiLogin(user)
        .then(res => {
          console.log(res.data);
          localStorage.setItem('usertoken', res.data.token);
          dispatch(login(res.data.user));
        })
        .catch(err => {
          dispatch(loginErr(err.response.data.message));
        });
    };
  };
  
  export const getUser = () => {
    return dispatch => {
      return callApi
        .callApiGetInfo()
        .then(res => {
          dispatch(
            login(res.data)
          );
        })
        .catch(err => {
          console.log(err);
          dispatch(
           logOut()
          );
        });
    };
  };
  export const logOut = () => {
    return dispatch => {
      localStorage.removeItem('usertoken');
      dispatch(logout());
    };
  };
  export const setCurrent = number => ({
    type: types.SET_CURRENT,
    number
  });
  export const setLogintype = logintype => ({
    type: types.SET_LOGINTYPE,
    logintype
  }); 
  export const setId = id => ({
    type: types.SET_ID,
    id
  }); 