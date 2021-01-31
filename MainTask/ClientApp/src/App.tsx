import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import AdminsTable from './components/UsersPage/AdminsTable';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Login from './components/Authorization/Login';
import Registration from './components/Authorization/Registration';
import SelectDate from './components/UsersPage/SelectDate';
import Profile from './components/UsersPage/Profile'
import Test from './components/UsersPage/test'
import Courses from './components/UsersPage/Courses'

import "antd/dist/antd.css";

import './custom.css'

export default () => (
    <Layout >
        <Route exact path='/' component={SelectDate} />
        <Route path='/login' component={Login} />
        <Route path='/admin' component={AdminsTable} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/counter' component={Counter} />
        <Route path='/register' component={Registration} />
        <Route path='/select' component={SelectDate} />
        <Route path='/profile' component={Profile} />
        <Route path='/test' component={Test} />
        <Route path='/courses' component={Courses} />
    </Layout>
);
