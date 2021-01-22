import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import {UserOutlined, KeyOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {areaStyle, buttonStyle, inputStyle} from '../Styles/MainFieldStyle'
import {sendLogin} from '../Services/AuthorizationQuery'
import { ApplicationState } from '../../store';
import * as loginDataStore from '../../store/reducers/loginData';
import { RouteComponentProps } from 'react-router';


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
    this.authData = null;
  }

  render(){
    return(
    <div style = {areaStyle}>
      <h2>Login</h2>
      <p>"username": "Vadim", "password": "Qwerty@123"</p>
      <br/>
      <div style = {inputStyle}>
        <Input type="text" size="large" placeholder="Nickname" value={this.state.username} prefix={<UserOutlined/>} 
        onChange={(event)=>{this.setState({username:event.target.value})}} />
        <br/><br/>
        <Input type="password" size="large" placeholder="Password" value={this.state.password} prefix={<KeyOutlined />} 
        onChange={(event)=>{this.setState({password: event.target.value})}} />
        <br/><br/>
        <Button type="primary" style = {buttonStyle} onClick={()=>{sendLogin(this.state)}}>
          <strong>LOGIN</strong> 
        </Button>
        <br/><br/>
        <Link to="/register">Registration</Link>
        <br/><br/>
      </div>
    </div>)
  };
}