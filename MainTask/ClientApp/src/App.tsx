import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import AdminsTable from './components/AdminsTable';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Login from './components/Authorization/Login';
import Logout from './components/Authorization/Logout';
import Registration from './components/Authorization/Registration';
import SelectDate from './components/SelectDate';
import Profile from './components/Profile'
import Test from './components/test'

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
        <Route path='/logout' component={Logout} />
        <Route path='/profile' component={Profile} />
        <Route path='/test' component={Test} />
    </Layout>
);
