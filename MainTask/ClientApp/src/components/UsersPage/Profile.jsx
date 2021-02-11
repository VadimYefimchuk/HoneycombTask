import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, InputNumber, Result } from 'antd';
import { areaStyle, inputStyle, buttonStyle } from '../Styles/MainFieldStyle'
import { submitUserData, userData } from '../Services/UserQuery';
import { openNotification } from '../Services/Notifications';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { updateUserInfo } from '../Services/AuthorizationQuery';
import '../Styles/ButtonStyle.css'
import { Link } from 'react-router-dom';




export default class Profile extends React.Component {

  constructor() {
    super();
    this.authData = JSON.parse(localStorage.getItem('login'));
  }

  profileField = <div style={areaStyle}>
    <h2>Your Profile</h2>
    <br />

    <div style={inputStyle}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        name="normal_login"
        initialValues={{
          name: userData.name,
          lastName: userData.lastName,
          age: parseInt(userData.age),
          email: userData.email,
          registeredDate: userData.registeredDate,
        }}
        onFinish={() => { submitUserData() }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name"
            onChange={(event) => { userData.name = event.target.value }}
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="LastName"
          rules={[
            {
              required: true,
              message: 'Please input your LastName!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="LastName"
            onChange={(event) => { userData.lastName = event.target.value }}
          />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              type: 'number', min: 0, max: 99,
              required: true,
              message: 'Please input your Age!',
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Age"
            onChange={(event) => { userData.age = event }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
        >
          <div style={{ textAlign: "left" }}>
            <label style={{ marginBottom: "1px" }} htmlFor="">{userData.email}</label>
          </div>

        </Form.Item>

        <Form.Item
          name="registeredDate"
          label="RegisteredDate"
        >
          <div style={{ textAlign: "left" }}>
            <label style={{ marginBottom: "1px" }} htmlFor="">{new Date(Date.parse(userData.registeredDate)).toLocaleString()}</label>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" className="buttonStyle" htmlType="submit">
            <strong>SAVE CHANGES</strong>
          </Button >
          <br /><br />
        </Form.Item>
      </Form>
    </div>
  </div>;

  render() {
    var checkLogin = this.authData.login;
    return (
      <div>
        {
          checkLogin
            ? <div>
              {this.profileField}
            </div>
            : <div style={areaStyle}>
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button style={buttonStyle} type="primary"><Link to="/register">register now!</Link></Button>}
              />
            </div>
        }
      </div>
    );
  }
}



