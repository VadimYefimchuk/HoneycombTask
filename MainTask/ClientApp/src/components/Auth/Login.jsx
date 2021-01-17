import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import {UserOutlined, KeyOutlined} from '@ant-design/icons';

export default class Login extends React.Component{
//const data = {"username": "Vadim", "password": "Qwerty@123"};
  state = {
    username: null,
    password: null,
    login: false,
    store:null
  }

  sendLogin = () =>{
    axios.post("https://localhost:44339/api/authenticate/login", this.state)
    .then((res) => {
      console.log(res.data.token)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  authStyle = {
    textAlign:"center",
    marginLeft:"auto",
    marginRight:"auto",
    width:"50%",
    backgroundColor:"white", 
    borderRadius: "20px"
  };

  buttonStyle ={
    backgroundColor: "#241829", 
    borderRadius: "10px", 
    width:"50%"
  };

  render(){
    return(
    <div style={this.authStyle}>
      <h1>Login page</h1>
      <p>"username": "Vadim", "password": "Qwerty@123"</p>
      <br/>
      <div style={{"width":"60%","textAlign":"center","marginLeft":"auto","marginRight":"auto"}}>
        <Input type="text" size="large" placeholder="Nickname" prefix={<UserOutlined/>} 
        onChange={(event)=>{this.setState({username:event.target.value})}} />
        <br/><br/>
        <Input type="password" size="large" placeholder="Password" prefix={<KeyOutlined />} 
        onChange={(event)=>{this.setState({password: event.target.value})}} />
        <br/><br/>
        <Button type="primary" style={this.buttonStyle} onClick={this.sendLogin}>
        LOGIN
        </Button>
        <br/><br/>

      </div>
    </div>)
  };
}
//export default connect()(login);