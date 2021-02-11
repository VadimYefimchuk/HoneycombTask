import * as React from 'react';
import { DatePicker, Space, TimePicker, Button } from 'antd';
import {areaStyle, inputStyle, buttonStyle} from '../Styles/MainFieldStyle'
import { submitUserData, userData } from '../Services/UserQuery';
import {openNotification} from '../Services/Notifications';
import moment from 'moment';



export default class SelectDate extends React.Component {

  constructor() {
    super();
    this.authData = JSON.parse(localStorage.getItem('login'));
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.state = {
      date: '2021-01-01',
      time: '00:00:00'
    }
  }

  submitDate = () => {
    if (this.state.date != null && this.state.time != null) {
      userData.studyDate = this.state.date + "T" + this.state.time;
      submitUserData();
      this.setState({date: '2021-01-01'});
      this.setState({time: '00:00:00'});
    }
    else {
      openNotification('error', 'ERROR!', 'Fields  is empty');
    }
  }

  render() {
    var checkLogin = this.authData.login;
    return (
      <div>
        {
          checkLogin
            ? <div style={areaStyle}>
              <h1 style={{ "textAlign": "center" }}>Please select date</h1>
              <div style={inputStyle}>
                <Space direction="horizontal">
                  <DatePicker value={moment(this.state.date, 'YYYY-MM-DD')} onChange={(time, dateString) => { this.setState({ date: dateString }) }} format={'YYYY-MM-DD'} />
                  <TimePicker value={moment(this.state.time, 'HH:mm:ss')} onChange={(time, timeString) => { this.setState({ time: timeString }) }} />
                </Space>
                <br /> <br />
                <Button type="primary" style={buttonStyle} onClick={() => { this.submitDate() }}>
                  <strong>SUBMIT DATE</strong>
                </Button>
              </div>
              <br />

            </div>
            : <div>
              <h1 className="text-white" style={{ "textAlign": "center" }}>Please AUTH (Date page)!</h1>
              <hr />
            </div>
        }
      </div>
    );
  }
}



