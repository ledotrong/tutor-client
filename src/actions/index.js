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
          if (res.data.status === "inactive") dispatch(setLogintype("facebook"));
          dispatch(login(res.data));
          
        })
        .catch(err => {
          console.log(err.response);
          dispatch(loginErr(err.response.data));
        });
    };
  };
  export const loginGgRequest = data => {
    return dispatch => {
      return callApi
        .callApiLoginGg(data)
        .then(res => {
          localStorage.setItem('usertoken', res.data.token);
          if (res.data.status === "inactive") dispatch(setLogintype("google"));
          dispatch(login(res.data));
          
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
          console.log("token",localStorage.getItem('usertoken'));
        })
        .catch(err => {
          console.log(err);
         if (err.response.data.message) dispatch(loginErr(err.response.data.message));
        });
    };
  };
  
  export const getUser = () => {
    return dispatch => {
      return callApi
        .callApiGetInfo()
        .then(res => {
          if (res.data.status === "active")
            dispatch(login(res.data));
          else localStorage.removeItem('usertoken');
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
  export const updatePicture = picture => ({
    type: types.UPDATE_PICTURE,
    picture
  })
  export const updateInfo = (user) => ({
    type: types.UPDATE_INFO,
    user
  })
  export const setSkills = (skills) => ({
    type: types.SET_SKILLS,
    skills
  })
  export const getSkills = () => {
    return dispatch => {
      return callApi
        .callApiGetSkills()
        .then(res => {
          dispatch(setSkills(res.data.skills));
        })
        .catch(err => {
          console.log(err);
        });
    };
  }