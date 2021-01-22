import * as React from 'react';
import { connect } from 'react-redux';

import { DatePicker, Space } from 'antd';
import { TimePicker, Button } from 'antd';

export default class Profile extends React.Component{

  constructor(){
    super();
    this.authData = JSON.parse(localStorage.getItem('login'));
  }

  render(){
    var checkLogin = this.authData.login;
    return(  
    <div>
      {
        checkLogin
        ? <div>
            <h1>Your profile here!</h1>
            <hr/>
          </div>
        : <div>
            <h1>Please AUTH (Profile page)!</h1>
            <hr/>
          </div>
      }
    </div>
    );
  }
}



