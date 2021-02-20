import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { areaStyle, inputStyle, buttonStyle } from '../Styles/MainFieldStyle'
import { sendLogin } from '../Services/AuthorizationQuery'
import FacebookAuthorization from './FacebookAuthorization';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../Styles/ButtonStyle.css'


class LoginComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "Vadim",
      password: "Qwerty@123",
      login: false,
      store: null
    };
    this.url = window.location.href.replace(window.location.pathname, "");
    this.authData = null;
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values);
  };



  render() {
    return (
      <div style={areaStyle}>
        <h2>Login</h2>
        <br />

        <div style={inputStyle}>
          <Form
            name="normal_login"
            initialValues={{
              username: this.state.username,
              password: this.state.password
            }}
            onFinish={() => { this.props.sendLogin(this.state) /*sendLogin(this.state)*/ }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
                onChange={(event) => { this.setState({ username: event.target.value }) }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onChange={(event) => { this.setState({ password: event.target.value }) }}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" className="buttonStyle" htmlType="submit">
                <strong>LOG IN</strong>
              </Button >
              <br />
              <FacebookAuthorization /> Or <Link to="/register">register now!</Link>
              <br /><br />
            </Form.Item>
          </Form>


        </div>
      </div>)
  };
}

const Login = connect(
  ({ login }, props) => {
    return {
    };
  },
  (dispatch) => {
    return {
      sendLogin(value) {
        dispatch(sendLogin(value));
      }
    };
  }
)(LoginComponent);

export default Login