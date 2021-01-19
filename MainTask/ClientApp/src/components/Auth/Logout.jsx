import * as React from 'react';
import Login from './Login';


export default class Logout extends React.Component{
  constructor(){
    super();
    localStorage.setItem('login', null);
    localStorage.setItem('userData',null);
    console.log("asd = " + localStorage.getItem('login'));
  }


  render(){
    return(
        <Login/>
    );
  };
}