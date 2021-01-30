import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Button } from 'antd';

import { Modal } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const onFinish = (values) => {
  console.log(values);
};

export default class Test extends React.Component {


  render() {
    return (
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'website']} label="Website">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    )
  }
};



/*
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
      */

/*
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
*/

/*
<div style = {areaStyle}>
                    <h2>Your Profile</h2>
                    <br/>
                    <div style = {inputStyle}>
                      <div style={{textAlign: "left"}}>
                        <Row>
                          <Col span={8}> <h5 style={{height:"100%"}}>Name:</h5> </Col>
                          <Col span={16}>
                            <Input style={{textAlign:"right"}} type="text" defaultValue={userData.name} placeholder="Name" prefix={<UserOutlined/>}
                            onChange={(event)=>{userData.name = event.target.value}} />
                          </Col>
                        </Row>

                        <br/>

                        <Row>
                          <Col span={8}><h5 style={{height:"100%"}}>Last name:</h5></Col>
                          <Col span={16}>
                            <Input type="text" defaultValue={userData.lastName} placeholder="LastName" prefix={<UserOutlined/>}
                            onChange={(event)=>{userData.lastName = event.target.value}} />
                          </Col>
                        </Row>

                        <br/>

                        <Row>
                          <Col span={8}><h5 style={{height:"100%"}}>Age:</h5></Col>
                          <Col span={16}>
                            <Input type="number" defaultValue={userData.age} placeholder="Age" prefix={<UserOutlined/>}
                            onChange={(event)=>{userData.age = Number(event.target.value)}} />
                          </Col>
                        </Row>

                        <br/>

                        <Row>
                          <Col span={8}><h5 style={{height:"100%"}}>Email:</h5></Col>
                          <Col span={16}><h6 style={{marginTop: "4px"}}>{userData.email}</h6> </Col>
                        </Row>

                        <br/>

                        <Row>
                          <Col span={8}><h5 style={{height:"100%"}}>Registered:</h5></Col>
                          <Col span={16}><h6 style={{marginTop: "4px"}}>{new Date(Date.parse(userData.registeredDate)).toLocaleString()}</h6></Col>
                        </Row>

                        <br/>

                        <Row>
                          <Col span={8}><h5 style={{height:"100%"}}>Study Date:</h5></Col>
                          <Col span={16}><h6 style={{marginTop: "4px"}}>{new Date(Date.parse(userData.studyDate)).toLocaleString()}</h6></Col>
                        </Row>

                        <br/>

                      </div>

                      <Button type="primary" style = {buttonStyle} onClick = {() => {submitUserData()}}>
                        <strong>SAVE CHANGES</strong>
                      </Button>

                      <br/><br/>
                    </div>
                  </div>
*/

/*
<Input type="text" value={this.state.currentUser.name} size="large" placeholder="Name" prefix={<UserOutlined />}
            onChange={(event) => {
              this.currentUser.name = event.target.value;
              this.setState({ currentUser: this.currentUser });
            }} />
          <br /><br />
          <Input type="text" value={this.state.currentUser.lastName} size="large" placeholder="LastName" prefix={<UserOutlined />}
            onChange={(event) => {
              this.currentUser.lastName = event.target.value;
              this.setState({ currentUser: this.currentUser })
            }} />
          <br /><br />
          <Input type="number" value={this.state.currentUser.age} size="large" placeholder="Age" prefix={<UserOutlined />}
            onChange={(event) => {
              this.currentUser.age = parseInt(event.target.value);
              this.setState({ currentUser: this.currentUser })
            }} />
          <br /><br />
          <Input type="datetime-local" value={this.state.currentUser.registeredDate} size="large" placeholder="RegisteredDate" prefix={<UserOutlined />}
            onChange={(event) => {
              this.currentUser.registeredDate = event.target.value;
              this.setState({ currentUser: this.currentUser })
            }} />
          <br /><br />
          <Input type="datetime-local" value={this.state.currentUser.studyDate} size="large" placeholder="StudyDate" prefix={<UserOutlined />}
            onChange={(event) => {
              this.currentUser.studyDate = event.target.value;
              this.setState({ currentUser: this.currentUser })
            }} />
          <br /><br />
*/