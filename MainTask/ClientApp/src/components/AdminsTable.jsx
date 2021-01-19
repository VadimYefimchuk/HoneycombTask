import * as React from 'react';
import { connect } from 'react-redux';
import UserList from './UserList'

export default class AdminsTable extends React.Component{

  constructor() {
    super();
    this.authData = JSON.parse(localStorage.getItem('login'));
    //console.log(this.authData);
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
        <h1 className="text-white" style ={{"textAlign":"center"}}>You are not ADMIN!</h1>
        <hr/>
      </div>
    }
  }

  mainStyle = {
    textAlign:"center",
    marginLeft:"auto",
    marginRight:"auto",
    width:"50%",
    backgroundColor:"white", 
    borderRadius: "20px"
  };

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
              <h1 className="text-white" style ={{"textAlign":"center"}}>Admins table</h1>
              <hr/>
              <UserList/>
            </div>
          : <div>
              <h1>You are not ADMIN!</h1>
              <hr/>
            </div>
        
        : <div>
            <h1 className="text-white" style ={{"textAlign":"center"}}>Please AUTH (Admin page)!</h1>
            <hr/>
          </div>
      }
      </div>
    );
  };
}

