import * as React from 'react';
import { connect } from 'react-redux';
import UserList from './UserList'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom';
import { areaStyle, buttonStyle } from '../Styles/MainFieldStyle'


class AdminsTableComponent extends React.Component {

  constructor(props) {
    super(props);
    this.authData = props.login;//JSON.parse(localStorage.getItem('login'));
  }

  mainStyle = {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    backgroundColor: "white",
    borderRadius: "20px"
  };

  render() {
    var checkRole = this.authData.role == "Admin";
    var checkLogin = this.authData.login;
    return (
      <div>
        {
          checkLogin
            ?
            checkRole
              ? <div>
                <h1 className="text-white" style={{ "textAlign": "center" }}>Admins table</h1>
                <hr />
                <div id="testModal"></div>
                <UserList />
              </div>
              : <div style={areaStyle}>
                <Result
                  status="403"
                  title="403"
                  subTitle="Sorry, you are not authorized to access this page."
                  extra={<Button style={buttonStyle} type="primary"><Link to="/courses">Courses!</Link></Button>}
                />
              </div>

            : <div style={areaStyle}>
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button style={buttonStyle} type="primary"><Link to="/register">Register now!</Link></Button>}
              />
            </div>
        }
      </div>
    );
  };
}

const AdminsTable = connect(
  ({ login }) => {
    return {
      login: login.loginData
    };
  },
  (dispatch) => {
    return {

    };
  }
)(AdminsTableComponent);

export default AdminsTable