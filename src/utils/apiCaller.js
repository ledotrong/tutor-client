import axios from 'axios';
import { api_url } from '../core/constants';

export function callApiLogin(body) {
  return axios({
    method: 'POST',
    data: body,
    url: `${api_url}/user/login`
  });
}
export function callApiLoginFb(body) {
  return axios({
    method: 'POST',
    data: body,
    mode: 'cors',
    url: `${api_url}/user/loginfb`
  });
}
export function callApiLoginGg(body) {
  return axios({
    method: 'POST',
    data: body,
    mode: 'cors',
    url: `${api_url}/user/logingg`
  });
}
export function callApiRegister(body) {
  return axios({
    method: 'POST',
    data: body,
    url: `${api_url}/user/register`
  });
}
export function callApiRegisterFb(body) {
  return axios({
    method: 'POST',
    data: body,
    url: `${api_url}/user/registerfb`
  });
}
export function callApiRegisterGg(body) {
  return axios({
    method: 'POST',
    data: body,
    url: `${api_url}/user/registergg`
  });
}
export function callApiAddInfo(body) {
  return axios({
    method: 'POST',
    data: body,
    url: `${api_url}/user/addinfo`
  });
}
export function callApiGetInfo() {
  return axios({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    },
    mode: 'cors',
    url: `${api_url}/me`
  });
}
export function callApiGetFacebookId(id) {
  return axios({
    method: 'GET',
    mode: 'cors',
    url: `${api_url}/user/getfacebookid?id=${id}`
  });
}
export function callApiGetGoogleId(id) {
  return axios({
    method: 'GET',
    mode: 'cors',
    url: `${api_url}/user/getgoogleid?id=${id}`
  });
}
export function callApiUpdateInfo(body) {
  return axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    },
    data: body,
    mode: 'cors',
    url: `${api_url}/user/updateinfo`
  });
}
export function callApiVerifyAccount(body){
  return axios({
    method: 'POST',
    data: body,
    url: `${api_url}/user/activatedaccount`
  })
}
export function callApiUpdateAvatar(body){
  return axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    },
    data: body,
    mode: 'cors',
    url: `https://cors-anywhere.herokuapp.com/${api_url}/user/updateavatar`
  })
}
export function callApiGetSkills(){
  return axios({
    method: 'GET',
    url: `${api_url}/skill/getallskills`
  });
}
export function callApiSearchTutorList(data){
  return axios({
    method: 'GET',
    url: `${api_url}/tutor/searchtutorlist?current=${data.current}&district=${data.district}&province=${data.province}&skill=${data.skill}&sortPrice=${data.sortPrice}`
  });
}
export function callApiGetTutorList(){
  return axios({
    method: 'GET',
    url: `${api_url}/tutor/gettutorlist`
  });
}
export function callApiGetUserDetail(_id){
  return axios({
    method: 'GET',
    url: `${api_url}/user/getuserdetail?_id=${_id}`
  });
}
export function callApiChangePassword(data){
  return axios({
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    },
    data: data,
    url: `${api_url}/user/changepassword`
  })
}
export function callApiChooseTutor(data){
  return axios({
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    },
    data: data,
    url: `${api_url}/contract/addcontract`
  })
}
export function callApiForgotPassword(email){
  console.log(email)
  return axios({
    method: "POST",
    mode: "cors",
    data: email,
    url: `${api_url}/user/forgotpassword`
  })
}
export function callApiCheckCode(data){
  return axios({
    method: "POST",
    mode: "cors",
    data: data,
    url: `${api_url}/user/checkcode`
  })
}
export function callApiChangeForgotPassword(data){
  return axios({
    method: "POST",
    mode: "cors",
    data: data,
    url: `${api_url}/user/changeforgotpassword`
  })
}
export function callApiGetContract(data){
  return axios({
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    },
    mode: "cors",
    url: `${api_url}/contract/getcontract?current=${data.current}&status=${data.status}`
  })
}
export function callApiUpdateContract(data){
  return axios({
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    },
    data: data,
    url: `${api_url}/contract/updatecontract`
  })
}
export function callApiGetMessage(id){
  return axios({
    method: "GET",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    },
    url: `${api_url}/message/getmessage?id=${id}`
  })
}
export function callApiAddMessage(data){
  return axios({
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    },
    data: data,
    url: `${api_url}/message/addmessage`
  })
}
export function callApiGet4Messages(data){
  return axios({
    method: "GET",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    },
    url: `${api_url}/message/get4messages?data=${data}`
  })
}
export function callApiSeenMessages(data){
  console.log(data)
  return axios({
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('usertoken')}`
    },
    data: data,
    url: `${api_url}/message/seenmessages`
  })
}