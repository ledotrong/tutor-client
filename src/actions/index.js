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
          callApi.callApiGet4Messages(0).then((data)=>{
            dispatch(set4Messages(data.data.data));
          }).catch(err=>{
            console.log(err);
          })
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
          callApi.callApiGet4Messages(0).then((data)=>{
            dispatch(set4Messages(data.data.data));
          }).catch(err=>{
            console.log(err);
          })
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
          callApi.callApiGet4Messages(0).then((data)=>{
            dispatch(set4Messages(data.data.data));
          }).catch(err=>{
            console.log(err);
          })
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
          if (res.data.status === "active"){
            dispatch(login(res.data));
            callApi.callApiGet4Messages(0).then((data)=>{
              dispatch(set4Messages(data.data.data));
            }).catch(err=>{
              console.log(err);
            })
          }
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
  export const setRole = role => ({
    type: types.SET_ROLE,
    role
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
  export const addMessage = message => ({
    type: types.ADD_MESSAGE,
    message
  });
  export const addMessageClient = message => ({
    type: types.ADD_MESSAGE_CLIENT,
    message
  });
  export const addMessageRequest = data =>{
    return dispatch=>{
      return callApi.callApiAddMessage(data).then(()=>{
        dispatch(addMessage(data));
        callApi.callApiGet4Messages(0).then((data1)=>{
          console.log("send message", data1.data.data)
          set4Messages(data1.data.data);
        }).catch(err=>{
          console.log(err);
        })
      }).catch(err=>{
        console.log(err);
      })
    }
  }
 export const setMessages = (data)=>({
   type: types.SET_MESSAGES,
   data
 })
  export const getMessage = id =>{
    return dispatch=>{
       callApi.callApiGetMessage(id).then((data)=>{
         if (data.data.messages[0]) {
         for (let i =0;i<data.data.messages[0].message.length; i++){
          if (data.data.messages[0].message[i].author === id)
          data.data.messages[0].message[i].author = "them";
          else data.data.messages[0].message[i].author = "me";
         }
        }
         console.log("dataaa", data)
      dispatch(setMessages(data))
    }).catch(err=>{
      console.log(err);
    })
  }
  }
  export const switchIsChat = data=>({
    type: types.SWITCH_IS_CHAT,
    data
  })
  export const add4Messages = data=>({
    type: types.ADD_4_MESSAGES,
    data
  })
  export const set4Messages = data=>({
    type: types.SET_4_MESSAGES,
    data
  })
  export const setNumOfNewMessages = data=>({
    type: types.SET_NUM_OF_NEW_MESSAGES,
    data
  })