import * as React from 'react';
import { connect } from 'react-redux';
import UserList from './UserList'


const adminsTable = () => (
  <div>
    <h1>Admin's table</h1>
    <hr/>

    <UserList/>
  </div>
);

export default connect()(adminsTable);
