import * as React from 'react';
import { connect } from 'react-redux';

import { DatePicker, Space } from 'antd';
import { TimePicker, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';
import {areaStyle, buttonStyle, inputStyle} from './Styles/MainFieldStyle'


export default class SelectDate extends React.Component{

  constructor(){
    super();
    this.authData = JSON.parse(localStorage.getItem('login'));
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.url = window.location.href.replace(window.location.pathname,"");
    //this.nowDate = Date.prototype.getDate() + "." + (Date.prototype.getMonth() + 1) + "." + Date.prototype.getFullYear();
    this.state = {
      date: null,
      time: null
    }
  }


  submitDate = () => {
    if(this.state.date != null && this.state.time != null){
      this.userData.studyDate = this.state.date + "T" + this.state.time;
      console.log("UserData -> " + JSON.stringify(this.userData));
      axios.put(
        this.url + `/api/students/` + this.userData.id,
        this.userData,
        {headers:{"Authorization":"Bearer " + this.authData.token}})
      .then(res => {
        console.log("Ураа!");
      })
      .catch((error) => {
        console.error(error)
      });

    }
  }

  render(){
    var checkLogin = this.authData.login;
    return(  
    <div>
      {
        checkLogin
        ? <div style={areaStyle}>
            <h1 style ={{"textAlign":"center"}}>Please select date</h1>
            <div style={inputStyle}>
            <Space direction = "horizontal">
              <DatePicker onChange={(time,dateString)=>{this.setState({date: dateString})}} format={'YYYY-MM-DD'} />
              <TimePicker onChange={(time,timeString)=>{this.setState({time: timeString})}}/> 
            </Space>
            <br/> <br/>
            <Button type="primary" style={buttonStyle} onClick = {()=>{this.submitDate()}}>
              <strong>SUBMIT DATE</strong>
            </Button>
            </div>
            <br/>

          </div>
        : <div>
            <h1 className="text-white" style ={{"textAlign":"center"}}>Please AUTH (Date page)!</h1>
            <hr/>
          </div>
      }
    </div>
    );
  }
}



