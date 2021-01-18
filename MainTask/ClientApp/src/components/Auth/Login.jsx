import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import {UserOutlined, KeyOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';


export default class Login extends React.Component{
  constructor(){
    super();
    this.state = {
      username: "Vadim",
      password: "Qwerty@123",
      login: false,
      store:null
    };
    this.url = window.location.href.replace(window.location.pathname,"");
  }

  sendLogin = () =>{
    axios.post(this.url + "/api/authenticate/login", this.state)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem('login', JSON.stringify({
        login: true,
        token: res.data.token,
        role: res.data.role
      }));
      this.setState({login: true});
      
      this.setState({username: null});
      this.setState({password: null});
    })
    .catch((error) => {
      console.error(error)
    });
  }

  authStyle = {
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
    return(
    <div style={this.authStyle}>
      <h2>Login</h2>
      <p>"username": "Vadim", "password": "Qwerty@123"</p>
      <br/>
      <div style={this.inputStyle}>
        <Input type="text" size="large" placeholder="Nickname" value={this.state.username} prefix={<UserOutlined/>} 
        onChange={(event)=>{this.setState({username:event.target.value})}} />
        <br/><br/>
        <Input type="password" size="large" placeholder="Password" value={this.state.password} prefix={<KeyOutlined />} 
        onChange={(event)=>{this.setState({password: event.target.value})}} />
        <br/><br/>
        <Button type="primary" style={this.buttonStyle} onClick={()=>{this.sendLogin()}}>
          LOGIN
        </Button>
        <br/><br/>
        <Link to="/register">Registration</Link>
        <br/><br/>
      </div>
    </div>)
  };
}
//export default connect()(login);