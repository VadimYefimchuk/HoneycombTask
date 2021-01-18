import * as React from 'react';
import { connect } from 'react-redux';
import UserList from './UserList'

export default class AdminsTable extends React.Component{

  constructor() {
    super();
    this.authData = JSON.parse(localStorage.getItem('login'));
    console.log(this.authData);
  }

  checkRole(){
    if(this.authData.role == "Admin"){
      return(
        <div>
          <h1>Admins table</h1>
          <hr/>
          <UserList/>
        </div>
      )
    }
    else{
      <div>
        <h1>You are not ADMIN!</h1>
        <hr/>
      </div>
    }
  }

  render(){
    var checkRole = this.authData.role == "Admin";
    var checkLogin = this.authData.login;
    return(
      <div>
        {
        checkLogin
        ? 
          checkRole
          ? <div>
              <h1>Admins table</h1>
              <hr/>
              <UserList/>
            </div>
          : <div>
              <h1>You are not ADMIN!</h1>
              <hr/>
            </div>
        
        : <div>
            <h1>Please AUTH (Admin page)!</h1>
            <hr/>
          </div>
      }
      </div>
    );
  };
}

