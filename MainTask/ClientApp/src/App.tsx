import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import AdminsTable from './components/AdminsTable';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Registration from './components/Auth/Registration';
import SelectDate from './components/SelectDate';

import "antd/dist/antd.css";

import './custom.css'

export default () => (
    <Layout >
        <Route exact path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/admin' component={AdminsTable} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/counter' component={Counter} />
        <Route path='/register' component={Registration} />
        <Route path='/select' component={SelectDate} />
        <Route path='/logout' component={Logout} />
        
    </Layout>
);
