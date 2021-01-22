import * as React from 'react';
import { DatePicker, Space } from 'antd';
import { TimePicker, Button } from 'antd';
import {areaStyle, buttonStyle, inputStyle} from '../Styles/MainFieldStyle';
import {submitDate} from '../Services/UserQuery'


export default class SelectDate extends React.Component{

  constructor(){
    super();
    this.authData = JSON.parse(localStorage.getItem('login'));
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.state = {
      date: null,
      time: null
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
            <Button type="primary" style={buttonStyle} onClick = {()=>{submitDate(this.state)}}>
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



