import * as React from 'react';
import { connect } from 'react-redux';
import PersonList from './UserList'

const Home = () => (
  <div>
    <h1>Hello, world2!</h1>
    <hr/>
    <PersonList/>
  </div>
);

export default connect()(Home);
