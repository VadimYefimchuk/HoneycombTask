import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import AdminsTable from './components/UsersPage/AdminsTable';
import Login from './components/Authorization/Login';
import Registration from './components/Authorization/Registration';
import Profile from './components/UsersPage/Profile'
import Courses from './components/UsersPage/Courses'

import "antd/dist/antd.css";

import './custom.css'

export default () => (
    <Layout >
        <Route exact path='/' component={Profile} />
        <Route path='/login' component={Login} />
        <Route path='/admin' component={AdminsTable} />
        <Route path='/register' component={Registration} />
        <Route path='/profile' component={Profile} />
        <Route path='/courses' component={Courses} />
    </Layout>
);
