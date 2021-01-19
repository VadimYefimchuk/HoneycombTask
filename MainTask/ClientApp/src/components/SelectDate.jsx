import * as React from 'react';
import { connect } from 'react-redux';

import { DatePicker, Space } from 'antd';
import { TimePicker, Button } from 'antd';
import moment from 'moment';

export default class SelectDate extends React.Component{

  constructor(){
    super();
    this.authData = JSON.parse(localStorage.getItem('login'));
    //this.nowDate = Date.prototype.getDate() + "." + (Date.prototype.getMonth() + 1) + "." + Date.prototype.getFullYear();
    this.state = {
      date: null,
      time:null
    }
  }

  DP = (event,dateString) => {
    console.log("event: " + event);
    console.log("event2: " + dateString);
  }

  TP = () => {
    console.log(this.state.date); // this will be a moment date object
    console.log(this.state.time);
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
              <DatePicker onChange={(time,dateString)=>{this.setState({date: dateString})}} format={'DD.MM.YYYY'} />
              <TimePicker onChange={(time,timeString)=>{this.setState({time: timeString})}}/>
            </Space>  
        
            <Button type="primary" onClick = {()=>{this.TP()}}>
              Submit Date
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



