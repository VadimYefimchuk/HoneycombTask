import * as React from 'react';
import Login from './Login';


export default class Logout extends React.Component{
  constructor(){
    super();
    localStorage.setItem('login', JSON.stringify({
        login: false,
        token: null,
        role: null
    }));
    console.log("asd = " + localStorage.getItem('login'));
  }


  render(){
    return(
        <Login/>
    );
  };
}