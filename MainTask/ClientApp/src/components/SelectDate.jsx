import * as React from 'react';
import { connect } from 'react-redux';

import { DatePicker, Space } from 'antd';
import { TimePicker, Button } from 'antd';

export default class SelectDate extends React.Component{

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
            <h1>TEST</h1>
            <Space direction="horizontal">
              <DatePicker />
              <TimePicker />
            </Space>  
        
            <Button type="primary" >
              authData
            </Button>
          </div>
        : <div>
            <h1>Please AUTH (Date page)!</h1>
            <hr/>
          </div>
      }
    </div>
    );
  }
}



