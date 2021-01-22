import * as React from 'react';
import axios from 'axios';
import { Input, Button } from 'antd';
import {UserOutlined, KeyOutlined, IeOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {areaStyle, buttonStyle, inputStyle} from '../Styles/MainFieldStyle'


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
            this.studentRegister();
        })
        .catch((error) => {
            console.error(error)
        })
    }

    studentRegister = () => {
        axios.post(this.url + "/api/students", this.state)
        .then((res) => {
            console.log(res.data);
            this.sendLogin();
        })
        .catch((error) => {
            console.error(error)
        })
    }

    sendLogin = () =>{
        axios.post(this.url + "/api/authenticate/login", this.state)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('login', JSON.stringify({
            login: true,
            token: res.data.token,
            role: res.data.role,
            uName: res.data.uName
          }));
          this.setState({login: true});
          
          this.setState({username: null});
          this.setState({password: null});
          this.authData = JSON.parse(localStorage.getItem('login'));
          this.getUserInfo();
        })
        .catch((error) => {
          console.error(error)
        });
    }

    getUserInfo = () =>{
        axios.get(
          this.url + `/api/students/SearchEmail?username=` + this.authData.uName,
          {headers:{"Authorization":"Bearer " + this.authData.token}})
          .then(res => {
            console.log(res.data);
            localStorage.setItem('userData', JSON.stringify({
              id: res.data.id,
              email: res.data.email,
              userName: res.data.userName,
              name: res.data.name,
              lastName: res.data.lastName,
              age: res.data.age,
              registeredDate:res.data.registeredDate,
              studyDate: res.data.studyDate
            }));

            this.setState({username: null});
            this.setState({email: null});
            this.setState({password: null});
            
            this.props.history.push("/select");
            if(window.location.pathname == "/select"){
              window.location.reload();
            }
            //this.history.push('/select');
            //Redirecthere
          })
          .catch((error) => {
            console.error(error)
          });
      }
  
    render(){
        return(
            <div style={areaStyle}>
                <h2>Registration</h2>
                <br/>
                <div style={inputStyle}>
                    <Input type="text" size="large" placeholder="Nickname" value={this.state.username} prefix={<UserOutlined/>} 
                    onChange={(event)=>{this.setState({username:event.target.value})}} />
                    <br/><br/>
                    <Input type="email" size="large" placeholder="Email" value={this.state.email} prefix={<IeOutlined />} 
                    onChange={(event)=>{this.setState({email: event.target.value})}} />
                    <br/><br/>
                    <Input type="password" size="large" placeholder="Password" value={this.state.password} prefix={<KeyOutlined />} 
                    onChange={(event)=>{this.setState({password: event.target.value})}} />
                    <br/><br/>
                    <Button type="primary" style={buttonStyle} onClick={this.sendRegister}>
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