import * as React from 'react';
import Login from './Login';


export default class Logout extends React.Component{
  constructor(){
    super();
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
    console.log("asd = " + localStorage.getItem('login'));
  }


  render(){
    return(
        <Login/>
    );
  };
}