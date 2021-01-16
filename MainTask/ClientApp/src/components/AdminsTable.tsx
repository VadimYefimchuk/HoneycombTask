import * as React from 'react';
import { connect } from 'react-redux';
import PersonList from './UserList'

const adminsTable = () => (
  <div>
    <h1>Admin's table</h1>
    <hr/>
    <PersonList/>
  </div>
);

export default connect()(adminsTable);
