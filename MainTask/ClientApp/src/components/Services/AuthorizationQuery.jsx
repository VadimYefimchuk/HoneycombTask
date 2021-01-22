import axios from 'axios';
import {studentRegister} from './UserQuery'
import {openNotification} from './Notifications'


export var url = window.location.href.replace(window.location.pathname, "");
export let authData = JSON.parse(localStorage.getItem('login')) | null;
export let userData = JSON.parse(localStorage.getItem('userData')) | null;


export function sendLogin(state) {
  axios.post(url + "/api/authenticate/login", state)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem('login', JSON.stringify({
        login: true,
        token: res.data.token,
        role: res.data.role,
        uName: res.data.uName
      }));

      authData = JSON.parse(localStorage.getItem('login'));

      getUserInfo();
    })
    .catch((error) => {
      console.error(error);
      openNotification('error', 'ERROR!', 'Not logged in');
    });
}

export function getUserInfo() {
  axios.get(
    url + `/api/students/SearchEmail?username=` + authData.uName,
    { headers: { "Authorization": "Bearer " + authData.token } })
    .then(res => {
      console.log(res.data);

      localStorage.setItem('userData', JSON.stringify({
        id: res.data.id,
        email: res.data.email,
        userName: res.data.userName,
        name: res.data.name,
        lastName: res.data.lastName,
        age: res.data.age,
        registeredDate: res.data.registeredDate,
        studyDate: res.data.studyDate
      }));

      window.location.href = "/select";
    })
    .catch((error) => {
      console.error(error);
      openNotification('error', 'ERROR!', 'No user information received');
    });
}

export function sendRegister(state){
  axios.post(url + "/api/authenticate/register", state)
  .then((res) => {
      console.log(res.data);
      studentRegister(state);
  })
  .catch((error) => {
      console.error(error);
      openNotification('error', 'ERROR!', 'Not registered');
  })
}

export function setLogout() {
  localStorage.setItem('login', JSON.stringify({
    login: null,
    token: null,
    role: null,
    uName: null,
  }));
  localStorage.setItem('userData', JSON.stringify({
    id: null,
    email: null,
    userName: null,
    name: null,
    lastName: null,
    age: null,
    registeredDate: null,
    studyDate: null
  }));
  window.location.href = "/login";
}