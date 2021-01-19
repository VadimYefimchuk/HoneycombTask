import * as React from 'react';
import { connect } from 'react-redux';

import { DatePicker, Space } from 'antd';
import { TimePicker, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';

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

  dateStyle = {
    textAlign:"center",
    marginLeft:"auto",
    marginRight:"auto",
    width:"50%",
    backgroundColor:"white", 
    borderRadius: "20px"
  };

  buttonStyle = {
    backgroundColor: "#241829", 
    borderRadius: "10px", 
    width:"50%"
  };

  inputStyle ={
    width:"60%",
    textAlign:"center",
    marginLeft:"auto",
    marginRight:"auto"
  }


  render(){
    var checkLogin = this.authData.login;
    return(  
    <div>
      {
        checkLogin
        ? <div style={this.dateStyle}>
            <h1 style ={{"textAlign":"center"}}>Please select date</h1>
            <div style={this.inputStyle}>
            <Space direction = "horizontal">
              <DatePicker onChange={(time,dateString)=>{this.setState({date: dateString})}} format={'YYYY-MM-DD'} />
              <TimePicker onChange={(time,timeString)=>{this.setState({time: timeString})}}/> 
            </Space>
            <br/> <br/>
            <Button type="primary" style={this.buttonStyle} onClick = {()=>{this.submitDate()}}>
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



