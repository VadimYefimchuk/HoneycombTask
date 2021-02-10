import * as React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, IeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { areaStyle, buttonStyle, inputStyle } from '../Styles/MainFieldStyle';
import { sendRegister } from '../Services/AuthorizationQuery';
import FacebookAuthorization from './FacebookAuthorization';



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
  }

  render() {
    return (
      <div style={areaStyle}>
        <h2>Registration</h2>
        <br />

        <div style={inputStyle}>
          <Form
            name="normal_login"
            onFinish={() => {sendRegister(this.state)}}
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
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Email is not a valid email!',
                },
              ]}
            >
              <Input prefix={<IeOutlined className="site-form-item-icon" />} placeholder="Email"
                onChange={(event) => { this.setState({ email: event.target.value }) }}
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
              <Button style={buttonStyle} htmlType="submit">
                <strong>REGISTRATION</strong>
              </Button >
              <br />
              <FacebookAuthorization/>
              <br /><br />
              Or <Link to="/login">Log in!</Link>
              <br /><br />
            </Form.Item>
          </Form>
        </div>
      </div>)
  };
}