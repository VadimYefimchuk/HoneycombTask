import * as React from 'react';
import axios from 'axios';
import { Input, Button } from 'antd';
import { UserOutlined, KeyOutlined, IeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { areaStyle, buttonStyle, inputStyle } from '../Styles/MainFieldStyle'
import {sendRegister} from '../Services/AuthorizationQuery'



export default class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      password: null,
      login: false,
      store: null
    };
    //this.url = window.location.href.replace(window.location.pathname,"");
  }

  render() {
    return (
      <div style={areaStyle}>
        <h2>Registration</h2>
        <br />
        <div style={inputStyle}>
          <Input type="text" size="large" placeholder="Nickname" value={this.state.username} prefix={<UserOutlined />}
            onChange={(event) => { this.setState({ username: event.target.value }) }} />
          <br /><br />
          <Input type="email" size="large" placeholder="Email" value={this.state.email} prefix={<IeOutlined />}
            onChange={(event) => { this.setState({ email: event.target.value }) }} />
          <br /><br />
          <Input type="password" size="large" placeholder="Password" value={this.state.password} prefix={<KeyOutlined />}
            onChange={(event) => { this.setState({ password: event.target.value }) }} />
          <br /><br />
          <Button type="primary" style={buttonStyle} onClick={() => {sendRegister(this.state)}}>
            <strong>REGISTRATION</strong>
          </Button>
          <br /><br />
          <Link to="/login">Login</Link>
          <br /><br />
        </div>
      </div>
    )
  };
}