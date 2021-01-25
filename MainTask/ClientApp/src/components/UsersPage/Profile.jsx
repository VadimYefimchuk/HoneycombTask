import * as React from 'react';
import { connect } from 'react-redux';
import { DatePicker, Space, Row, Col, Button, Input } from 'antd';
import { areaStyle, buttonStyle, inputStyle, verticalTextAlign } from '../Styles/ProfileStyle';
import { submitUserData, userData } from '../Services/UserQuery';
import {openNotification} from '../Services/Notifications';
import {UserOutlined, KeyOutlined} from '@ant-design/icons';


export default class Profile extends React.Component{

  constructor(){
    super();
    this.authData = JSON.parse(localStorage.getItem('login'));
  }

  profileField = <div style = {areaStyle}>
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
                          <Col span={16}><h6>{userData.email}</h6> </Col>
                        </Row>
                        
                        <br/>

                        <Row>
                          <Col span={8}><h5 style={{height:"100%"}}>Registered:</h5></Col>
                          <Col span={16}><h6>{new Date(Date.parse(userData.registeredDate)).toLocaleString()}</h6></Col>
                        </Row>
                        
                        <br/>

                        <Row>
                          <Col span={8}><h5 style={{height:"100%"}}>Study Date:</h5></Col>
                          <Col span={16}><h6>{new Date(Date.parse(userData.studyDate)).toLocaleString()}</h6></Col>
                        </Row>
                        
                        <br/>

                      </div>

                      <Button type="primary" style = {buttonStyle} onClick = {() => {submitUserData()}}>
                        <strong>SAVE CHANGES</strong> 
                      </Button>

                      <br/><br/>
                    </div>
                  </div>;

  render(){
    var checkLogin = this.authData.login;
    return(  
    <div>
      {
        checkLogin
        ? <div>
            {this.profileField}
          </div>
        : <div>
            <h1 className="text-white" style={{ "textAlign": "center" }} >Please AUTH (Profile page)!</h1>
            <hr/>
          </div>
      }
    </div>
    );
  }
}



