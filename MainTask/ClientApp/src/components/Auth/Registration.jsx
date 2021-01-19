import * as React from 'react';
import axios from 'axios';
import { Input, Button } from 'antd';
import {UserOutlined, KeyOutlined, IeOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';


export default class Registration extends React.Component{
    constructor(){
        super();
        this.state = {
          username: null,
          email: null,
          password: null,
          login: false,
          store:null
        };
        this.url = window.location.href.replace(window.location.pathname,"");
      }
  
    sendRegister = () =>{
        axios.post(this.url + "/api/authenticate/register", this.state)
        .then((res) => {
            console.log(res.data);
            this.setState({username: null});
            this.setState({email: null});
            this.setState({password: null});
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
  
    buttonStyle = {
        backgroundColor: "#241829", 
        borderRadius: "10px", 
        width:"50%"
    };

    inputStyle = {
        width:"60%",
        textAlign:"center",
        marginLeft:"auto",
        marginRight:"auto"
    }
  
    render(){
        return(
            <div style={this.authStyle}>
                <h2>Registration</h2>
                <br/>
                <div style={this.inputStyle}>
                    <Input type="text" size="large" placeholder="Nickname" value={this.state.username} prefix={<UserOutlined/>} 
                    onChange={(event)=>{this.setState({username:event.target.value})}} />
                    <br/><br/>
                    <Input type="email" size="large" placeholder="Email" value={this.state.email} prefix={<IeOutlined />} 
                    onChange={(event)=>{this.setState({email: event.target.value})}} />
                    <br/><br/>
                    <Input type="password" size="large" placeholder="Password" value={this.state.password} prefix={<KeyOutlined />} 
                    onChange={(event)=>{this.setState({password: event.target.value})}} />
                    <br/><br/>
                    <Button type="primary" style={this.buttonStyle} onClick={this.sendRegister}>
                        <strong>REGISTRATION</strong> 
                    </Button>
                    <br/><br/>
                    <Link to="/login">Login</Link>
                    <br/><br/>
                </div>
            </div>
        )
      };
}